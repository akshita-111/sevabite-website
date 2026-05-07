import SectionHeader from "../components/SectionHeader";
import Card3D from "../components/Card3D";

function Services() {
  const services = [
    { title: "Donation Campaigns", text: "Create premium donation journeys with clear storytelling.", icon: "🧩" },
    { title: "Impact Analytics", text: "Understand results through insights and transparent metrics.", icon: "📊" },
    { title: "Volunteer Coordination", text: "Coordinate events and support communities in real-time.", icon: "🛠️" },
    { title: "NGO Onboarding", text: "Guide organizations with smooth setup and reliable workflows.", icon: "🏢" },
    { title: "Donor Communication", text: "Build long-term trust with updates and engagement tools.", icon: "💬" },
    { title: "Program Visibility", text: "Showcase outcomes with rich, visual social proof.", icon: "🌟" }
  ];

  return (
    <section className="section-container rounded-[2.5rem] bg-gradient-to-br from-[#1a2229] via-[#1a2430] to-[#1e2d40]">
      <SectionHeader
        eyebrow="Services"
        title="Everything needed to run high-impact initiatives"
        description="Flexible modules to support programs, teams, and donor trust."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((item, i) => (
          <Card3D key={item.title} {...item} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

export default Services;
