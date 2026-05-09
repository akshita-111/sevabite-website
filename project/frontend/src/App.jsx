import { useEffect, useRef } from "react";
import { useScroll, useVelocity, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import CustomCursor from "./components/CustomCursor";
import Lenis from "@studio-freight/lenis";

function App() {
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  useEffect(() => {
    // Set initial slow motion
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
    }
    
    return smoothVelocity.on("change", (latest) => {
      if (videoRef.current) {
        // Slow ramp: divide by 4000 so only very fast scrolls noticeably speed up
        const velocityMultiplier = Math.abs(latest) / 4000;
        // Base 0.3x, max 1.5x — gentle, cinematic feel
        const newRate = Math.min(Math.max(0.3 + velocityMultiplier, 0.3), 1.5);
        videoRef.current.playbackRate = newRate;
      }
    });
  }, [smoothVelocity]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen text-slate-50 relative">
      {/* Fixed Background Video playing dynamically */}
      <div className="fixed inset-0 -z-20 h-full w-full">
        <video 
          key="bg-video"
          ref={videoRef}
          autoPlay
          loop
          muted 
          playsInline 
          className="h-full w-full object-cover"
          style={{ objectPosition: "center center" }}
        >
          <source src={`/background.mp4?v=2`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay to ensure text contrast over background video */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"></div>
      </div>

      <CustomCursor />
      <Navbar />
      <main className="pt-20 md:pt-24 relative z-0">
        {/* Home Section */}
        <section
          id="home"
          className="snap-start relative mx-20 rounded-3xl overflow-hidden mb-6"
          style={{ backgroundImage: "url('/home section.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="relative z-10"><Home /></div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="snap-start relative mx-20 rounded-3xl overflow-hidden mb-6"
          style={{ backgroundImage: "url('/about section.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="relative z-10"><About /></div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="snap-start relative mx-20 rounded-3xl overflow-hidden mb-6"
          style={{ backgroundImage: "url('/service.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="relative z-10"><Services /></div>
        </section>

        {/* Donate Section */}
        <section
          id="donate"
          className="snap-start relative mx-20 rounded-3xl overflow-hidden mb-6"
          style={{ backgroundImage: "url('/donate.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-slate-950/65" />
          <div className="relative z-10"><Donate /></div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="snap-start relative mx-20 rounded-3xl overflow-hidden mb-6"
          style={{ backgroundImage: "url('/contact.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-slate-950/65" />
          <div className="relative z-10"><Contact /></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
