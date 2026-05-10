import SectionHeader from "../components/SectionHeader";
import Card3D from "../components/Card3D";

function About() {
  const items = [
    { title: "Mission", text: "Make social impact funding transparent, beautiful, and frictionless.", icon: "🎯" },
    { title: "Vision", text: "A world where every contribution creates measurable positive change.", icon: "🌍" },
    { title: "Values", text: "Empathy, trust, innovation, and sustainable community growth.", icon: "💚" }
  ];

  return (
    <div className="section-container">
      <SectionHeader
        eyebrow="Our Mission"
        title="Why SevaBite Exists"
        description="Millions of meals are wasted every day while countless people struggle for food. SevaBite bridges this gap by helping restaurants, events, and communities donate surplus food efficiently and responsibly."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Card3D 
            key={item.title} 
            {...item} 
            delay={i * 0.1} 
            isTransparent={item.title === "Vision"} 
          />
        ))}
      </div>
    </div>
  );
}

export default About;
