const API_BASE = "http://localhost:5000/api";

async function submitForm(form, endpoint, payloadBuilder) {
  const statusEl = form.querySelector(".status");
  statusEl.textContent = "Submitting...";
  statusEl.className = "status";

  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadBuilder())
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");

    statusEl.textContent = data.message || "Submitted successfully!";
    statusEl.classList.add("success");
    form.reset();
  } catch (error) {
    statusEl.textContent = error.message || "Submission failed.";
    statusEl.classList.add("error");
  }
}

const donateForm = document.getElementById("donateForm");
if (donateForm) {
  donateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm(donateForm, "donations", () => ({
      name: donateForm.name.value.trim(),
      email: donateForm.email.value.trim(),
      amount: Number(donateForm.amount.value),
      message: donateForm.message.value.trim()
    }));
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm(contactForm, "contacts", () => ({
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim()
    }));
  });
}
