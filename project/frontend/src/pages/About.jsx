import SectionHeader from "../components/SectionHeader";
import Card3D from "../components/Card3D";

function About() {
  const items = [
    { title: "Mission", text: "Make social impact funding transparent, beautiful, and frictionless.", icon: "🎯" },
    { title: "Vision", text: "A world where every contribution creates measurable positive change.", icon: "🌍" },
    { title: "Values", text: "Empathy, trust, innovation, and sustainable community growth.", icon: "💚" }
  ];

  return (
    <section className="section-container rounded-[2.5rem]">
      <SectionHeader
        eyebrow="About"
        title="Modern platform with human-first values"
        description="We combine product thinking, design, and community intent to improve giving outcomes."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Card3D key={item.title} {...item} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

export default About;
