const express = require("express");

const router = express.Router();

const DISCLAIMER =
  "AI assessment is preliminary. Final food acceptance and safety must be confirmed by the receiving organization.";

const VALID_STATUSES = ["Suitable for Donation", "Needs Verification", "Not Recommended"];
const VALID_ROUTES = ["NGO", "Community Kitchen", "Animal Feeding", "Composting"];
const VALID_PRIORITIES = ["High", "Medium", "Low"];

/**
 * Deterministic heuristic evaluation for offline testing, missing API key, or API fallback.
 */
function evaluateHeuristic({ foodType, quantity, timeSincePrep, storageCondition, notes }) {
  const normFood = (foodType || "").toLowerCase().trim();
  const normTime = (timeSincePrep || "").toLowerCase().trim();
  const normStorage = (storageCondition || "").toLowerCase().trim();
  const normNotes = (notes || "").toLowerCase().trim();

  // 1. Check for insufficient or ambiguous information
  if (
    normFood.length < 3 ||
    normFood.includes("unknown") ||
    normFood.includes("stuff") ||
    normFood.includes("leftover") && normFood.length < 12 ||
    normTime.includes("unknown") ||
    normTime.includes("not sure") ||
    normStorage.includes("unknown") ||
    normStorage.includes("not sure")
  ) {
    return {
      foodStatus: "Needs Verification",
      suggestedRoute: "Community Kitchen",
      priority: "Medium",
      shortReason: "Information provided is insufficient or ambiguous to verify food safety thresholds.",
      nextAction: "Verify preparation time and inspect sensory quality before arranging distribution."
    };
  }

  // 2. Check for explicit spoilage or off-odors
  if (
    normNotes.includes("smell") ||
    normNotes.includes("spoil") ||
    normNotes.includes("stale") ||
    normNotes.includes("mold") ||
    normNotes.includes("sour") ||
    normNotes.includes("bad") ||
    normNotes.includes("leak")
  ) {
    return {
      foodStatus: "Not Recommended",
      suggestedRoute: "Composting",
      priority: "Low",
      shortReason: "Sensory notes indicate possible spoilage, off-odors, or compromised integrity.",
      nextAction: "Safely dispose of food through an approved organic composting facility."
    };
  }

  const isRoomTemp = normStorage.includes("room") || normStorage.includes("ambient");
  const isCold = normStorage.includes("refrigerat") || normStorage.includes("chilled") || normStorage.includes("frozen");
  const isHotHeld = normStorage.includes("hot") || normStorage.includes("heated") || normStorage.includes("60");
  const isDryPantry = normStorage.includes("dry") || normStorage.includes("pantry") || normStorage.includes("sealed");

  const isLongTime =
    normTime.includes("yesterday") ||
    normTime.includes("day") ||
    normTime.includes("5") ||
    normTime.includes("6") ||
    normTime.includes("8") ||
    normTime.includes("12") ||
    normTime.includes("24");

  const isBakeryOrDry =
    (normFood.includes("bread") ||
      normFood.includes("biscuit") ||
      normFood.includes("bakery") ||
      normFood.includes("grain") ||
      normFood.includes("packaged") ||
      normFood.includes("cereal") ||
      normFood.includes("flour") ||
      normFood.includes("dry")) &&
    !normFood.includes("cream") &&
    !normFood.includes("curry") &&
    !normFood.includes("meat");

  // 3. Dry / Packaged / Bakery goods (extended stability)
  if (isDryPantry || isBakeryOrDry) {
    if (isLongTime && !isDryPantry) {
      return {
        foodStatus: "Needs Verification",
        suggestedRoute: "NGO",
        priority: "Medium",
        shortReason: "Bakery goods at ambient temperature require freshness check before redistribution.",
        nextAction: "Inspect texture and packaging integrity before volunteer pickup."
      };
    }
    return {
      foodStatus: "Suitable for Donation",
      suggestedRoute: "NGO",
      priority: "Low",
      shortReason: "Dry and bakery goods possess extended shelf stability with low bacterial risk.",
      nextAction: "Schedule standard volunteer pickup or drop-off at partner NGO center."
    };
  }

  // 4. Perishable cooked food stored at room temperature for extended time (>4 hours)
  if (isRoomTemp && isLongTime) {
    const isAnimalSuitable =
      !normFood.includes("chocolate") &&
      !normFood.includes("onion") &&
      !normFood.includes("garlic") &&
      !normFood.includes("grape") &&
      (normFood.includes("vegetable") || normFood.includes("rice") || normFood.includes("grain") || normFood.includes("fruit"));

    return {
      foodStatus: "Not Recommended",
      suggestedRoute: isAnimalSuitable ? "Animal Feeding" : "Composting",
      priority: "Low",
      shortReason: "Perishable cooked food kept at room temperature beyond 4 hours exceeds standard safety limits for human consumption.",
      nextAction: isAnimalSuitable
        ? "Redirect to an approved local animal shelter or animal welfare feeding drive."
        : "Direct to a local organic composting facility."
    };
  }

  // 5. Fresh cooked food at room temperature nearing 3-4 hours
  if (isRoomTemp && normTime.includes("3 - 4")) {
    return {
      foodStatus: "Suitable for Donation",
      suggestedRoute: "Community Kitchen",
      priority: "High",
      shortReason: "Food is approaching the 4-hour room temperature safety boundary; immediate consumption required.",
      nextAction: "Dispatch urgently to the nearest community kitchen for immediate meal service."
    };
  }

  // 6. Fresh room temperature (< 2 hours)
  if (isRoomTemp) {
    return {
      foodStatus: "Suitable for Donation",
      suggestedRoute: "Community Kitchen",
      priority: "High",
      shortReason: "Freshly cooked food stored at room temperature requires rapid distribution within 2 hours.",
      nextAction: "Coordinate immediate pickup or direct delivery to the nearest community kitchen."
    };
  }

  // 7. Cold-stored (Refrigerated / Frozen)
  if (isCold) {
    return {
      foodStatus: "Suitable for Donation",
      suggestedRoute: "NGO",
      priority: "Medium",
      shortReason: "Adequate cold-chain storage preserves quality for safe scheduled rescue.",
      nextAction: "Maintain temperature control in insulated carriers during transport."
    };
  }

  // 8. Hot-held
  if (isHotHeld) {
    return {
      foodStatus: "Suitable for Donation",
      suggestedRoute: "Community Kitchen",
      priority: "High",
      shortReason: "Hot food maintained above 60°C is safe for prompt consumption.",
      nextAction: "Dispatch in thermal insulated containers to a local community kitchen."
    };
  }

  // Default / Catch-all
  return {
    foodStatus: "Needs Verification",
    suggestedRoute: "Community Kitchen",
    priority: "Medium",
    shortReason: "Storage condition requires on-site inspection before consumption.",
    nextAction: "Inspect packaging and internal temperature upon pickup."
  };
}

/**
 * Call Google Gemini LLM
 */
async function callGemini(apiKey, payload) {
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`;

  const systemInstruction = `You are an expert preliminary Food Donation Assessment Agent for SevaBite.
Your role is to assess surplus food for safe donation routing, urgency, and suitability.
Outputs must strictly adhere to:
- foodStatus: "Suitable for Donation" | "Needs Verification" | "Not Recommended"
- suggestedRoute: "NGO" | "Community Kitchen" | "Animal Feeding" | "Composting"
- priority: "High" | "Medium" | "Low"
- shortReason: 1 to 2 clear sentences explaining the safety/operational rationale.
- nextAction: 1 concise sentence describing the immediate next step.

Safety rules:
1. Perishable cooked food stored at room temperature (> 4 hours) is unsafe for humans: return "Not Recommended", routed to "Animal Feeding" (if safe grains/greens) or "Composting", priority "Low".
2. Freshly prepared food needing prompt consumption: return "Suitable for Donation", routed to "Community Kitchen", priority "High".
3. Properly refrigerated (<4°C), frozen, or shelf-stable dry goods: return "Suitable for Donation", routed to "NGO", priority "Medium" or "Low".
4. If details are vague, insufficient, questionable, or contradictory: return "Needs Verification".

Strictly return a JSON object with keys: foodStatus, suggestedRoute, priority, shortReason, nextAction. No markdown, no preface.`;

  const userText = `Please assess this food donation:
- Food Type: ${payload.foodType}
- Quantity / Meals: ${payload.quantity}
- Time Since Preparation: ${payload.timeSincePrep}
- Storage Condition: ${payload.storageCondition}
- Optional Notes: ${payload.notes || "None"}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: userText }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 250,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("Empty response from Gemini API");

  return JSON.parse(rawText.trim());
}

/**
 * Call OpenAI LLM
 */
async function callOpenAI(apiKey, payload) {
  const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const url = `${baseUrl}/chat/completions`;

  const systemInstruction = `You are an expert preliminary Food Donation Assessment Agent for SevaBite.
Your role is to assess surplus food for safe donation routing, urgency, and suitability.
Allowed values:
- foodStatus: "Suitable for Donation" | "Needs Verification" | "Not Recommended"
- suggestedRoute: "NGO" | "Community Kitchen" | "Animal Feeding" | "Composting"
- priority: "High" | "Medium" | "Low"
- shortReason: 1 to 2 sentences.
- nextAction: 1 sentence.

Rules:
1. Cooked food held at room temperature >4 hours is unsafe for humans: status "Not Recommended", routed to "Animal Feeding" or "Composting".
2. Rapidly perishable food: status "Suitable for Donation", routed to "Community Kitchen", priority "High".
3. Cold-stored or shelf-stable food: status "Suitable for Donation", routed to "NGO".
4. Insufficient, contradictory, or vague information: status "Needs Verification".

Return only a valid JSON object with keys: foodStatus, suggestedRoute, priority, shortReason, nextAction.`;

  const userText = `Evaluate food donation:
Food Type: ${payload.foodType}
Quantity: ${payload.quantity}
Time Since Preparation: ${payload.timeSincePrep}
Storage Condition: ${payload.storageCondition}
Notes: ${payload.notes || "None"}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 250,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userText }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;
  if (!rawText) throw new Error("Empty response from OpenAI API");

  return JSON.parse(rawText.trim());
}

/**
 * Sanitize and validate LLM output into strict enums
 */
function sanitizeRecommendation(raw, fallback) {
  const result = { ...fallback };

  if (raw && typeof raw === "object") {
    // Validate foodStatus
    const matchedStatus = VALID_STATUSES.find(
      (s) => s.toLowerCase() === String(raw.foodStatus || "").toLowerCase()
    );
    if (matchedStatus) result.foodStatus = matchedStatus;

    // Validate suggestedRoute
    const matchedRoute = VALID_ROUTES.find(
      (r) => r.toLowerCase() === String(raw.suggestedRoute || "").toLowerCase()
    );
    if (matchedRoute) result.suggestedRoute = matchedRoute;

    // Validate priority
    const matchedPriority = VALID_PRIORITIES.find(
      (p) => p.toLowerCase() === String(raw.priority || "").toLowerCase()
    );
    if (matchedPriority) result.priority = matchedPriority;

    if (raw.shortReason && typeof raw.shortReason === "string" && raw.shortReason.trim().length > 5) {
      result.shortReason = raw.shortReason.trim();
    }

    if (raw.nextAction && typeof raw.nextAction === "string" && raw.nextAction.trim().length > 5) {
      result.nextAction = raw.nextAction.trim();
    }
  }

  result.disclaimer = DISCLAIMER;
  return result;
}

/**
 * POST /api/food-agent/assess (and POST /api/food-agent)
 */
const assessHandler = async (req, res) => {
  const { foodType, quantity, timeSincePrep, storageCondition, notes } = req.body || {};

  // Input validation
  if (!foodType || typeof foodType !== "string" || !foodType.trim()) {
    return res.status(400).json({ message: "Food type is required." });
  }

  if (!quantity || (typeof quantity !== "string" && typeof quantity !== "number") || !String(quantity).trim()) {
    return res.status(400).json({ message: "Quantity / meals is required." });
  }

  if (!timeSincePrep || typeof timeSincePrep !== "string" || !timeSincePrep.trim()) {
    return res.status(400).json({ message: "Time since preparation is required." });
  }

  if (!storageCondition || typeof storageCondition !== "string" || !storageCondition.trim()) {
    return res.status(400).json({ message: "Storage condition is required." });
  }

  const payload = {
    foodType: foodType.trim(),
    quantity: String(quantity).trim(),
    timeSincePrep: timeSincePrep.trim(),
    storageCondition: storageCondition.trim(),
    notes: (notes || "").trim()
  };

  // Pre-calculate baseline heuristic for fallback/safety
  const fallback = evaluateHeuristic(payload);

  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  let recommendation;
  let providerUsed = "heuristic";

  try {
    if (geminiKey && geminiKey !== "your_gemini_api_key_here") {
      const raw = await callGemini(geminiKey, payload);
      recommendation = sanitizeRecommendation(raw, fallback);
      providerUsed = "gemini";
    } else if (openAiKey && openAiKey !== "your_openai_api_key_here") {
      const raw = await callOpenAI(openAiKey, payload);
      recommendation = sanitizeRecommendation(raw, fallback);
      providerUsed = "openai";
    } else {
      recommendation = { ...fallback, disclaimer: DISCLAIMER };
      providerUsed = "rule-engine";
    }
  } catch (err) {
    console.warn(`[FoodAgent] LLM invocation failed, using safe fallback: ${err.message}`);
    recommendation = { ...fallback, disclaimer: DISCLAIMER };
    providerUsed = "fallback";
  }

  return res.json({
    ok: true,
    data: recommendation,
    meta: {
      provider: providerUsed,
      evaluatedAt: new Date().toISOString()
    }
  });
};

router.post("/assess", assessHandler);
router.post("/", assessHandler);

module.exports = router;
