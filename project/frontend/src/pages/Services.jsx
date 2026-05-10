import SectionHeader from "../components/SectionHeader";
import Card3D from "../components/Card3D";

function Services() {
  const services = [
    { title: "Food Collection", text: "Collecting surplus food from restaurants, events, and stores.", icon: "🚛" },
    { title: "NGO Distribution", text: "Delivering food safely to NGOs and communities in need.", icon: "🏠" },
    { title: "Volunteer Network", text: "Connecting volunteers to help reduce food waste locally.", icon: "🤝" },
    { title: "Smart Redistribution", text: "Ensuring food reaches the right people before it goes to waste.", icon: "🧠" }
  ];

  return (
    <div className="section-container">
      <SectionHeader
        eyebrow="What We Do"
        title="How We Make Impact"
        description="Our simple yet effective process ensures zero food waste and maximum social good."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((item, i) => (
          <Card3D key={item.title} {...item} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}

export default Services;
