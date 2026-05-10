import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Card3D({ title, text, icon, delay = 0, isTransparent = false }) {
  const cardRef = useRef(null);

  useEffect(() => {
    // ... animation logic stays same
    const el = cardRef.current;
    
    // Smooth Entrance with Fade-up, Scale, and Stagger
    gsap.fromTo(el, 
      { opacity: 0, y: 40, scale: 0.96 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.2, 
        ease: "power3.out",
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subtle Floating Idle Motion
    const floatAnim = gsap.to(el, {
      y: "-=8",
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 2
    });

    return () => {
      floatAnim.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [delay]);

  return (
    <article
      ref={cardRef}
      className="interactive-card group relative rounded-3xl p-6 shadow-premium transition-all duration-500 hover:shadow-[0_0_30px_rgba(45,207,115,0.15)]"
      style={{
        background: isTransparent ? "transparent" : "rgba(10, 15, 30, 0.35)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(20px)",
      }}
      onMouseEnter={() => {
        gsap.to(cardRef.current, { y: -10, scale: 1.03, rotateX: -2, rotateY: 2, duration: 0.4, ease: "power2.out" });
      }}
      onMouseLeave={() => {
        gsap.to(cardRef.current, { y: 0, scale: 1, rotateX: 0, rotateY: 0, duration: 0.4, ease: "power2.out" });
      }}
    >
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-redSoft via-orangeSoft to-greenSoft text-3xl shadow-lg transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-3 text-2xl font-black text-white">{title}</h3>
      <p className="text-slate-300 font-medium leading-relaxed text-base">{text}</p>
      <div className="mt-6 h-1.5 w-0 rounded-full bg-gradient-to-r from-redSoft to-greenSoft transition-all duration-700 group-hover:w-full" />
      
      {/* Soft Glow Overlay on Hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
    </article>
  );
}

export default Card3D;
