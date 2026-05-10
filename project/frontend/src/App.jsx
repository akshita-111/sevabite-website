import { useEffect, useRef } from "react";
import { motion, useScroll, useVelocity, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import CustomCursor from "./components/CustomCursor";
import Lenis from "@studio-freight/lenis";

const SectionWrapper = ({ id, bgImage, children, overlayOpacity = "60" }) => {
  return (
    <section
      id={id}
      className="snap-start relative mx-4 md:mx-20 rounded-[3rem] overflow-hidden mb-12 border border-white/5"
      style={{ 
        backgroundImage: `url('${bgImage}')`, 
        backgroundSize: "cover", 
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className={`absolute inset-0 bg-slate-950/${overlayOpacity}`} />
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

function App() {
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start paused
    video.pause();
    
    // Play only when scrolling, speed based on velocity
    return smoothVelocity.on("change", (latest) => {
      const velocity = Math.abs(latest);
      if (velocity > 20) {
        if (video.paused) video.play().catch(() => {});
        // Map velocity to playback rate (min 0.5, max 2.5)
        const newRate = Math.min(Math.max(velocity / 800, 0.5), 2.5);
        video.playbackRate = newRate;
      } else {
        if (!video.paused) video.pause();
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
      {/* Fixed Background Video */}
      <div className="fixed inset-0 -z-20 h-full w-full overflow-hidden">
        <video 
          key="bg-video"
          ref={videoRef}
          autoPlay
          loop
          muted 
          playsInline 
          className="h-full w-full object-cover scale-105"
          style={{ objectPosition: "center center" }}
        >
          <source src="https://images.pexels.com/video-files/6646907/6646907-uhd_3840_2160_25fps.mp4" type="video/mp4" />
        </video>
      </div>

      <CustomCursor />
      <Navbar />
      
      <main className="pt-24 pb-12 relative z-0">
        <SectionWrapper id="home" bgImage="/home section.png">
          <Home />
        </SectionWrapper>

        <SectionWrapper id="about" bgImage="/about section.png">
          <About />
        </SectionWrapper>

        <SectionWrapper id="services" bgImage="/service.png">
          <Services />
        </SectionWrapper>

        <SectionWrapper id="donate" bgImage="/donate.png" overlayOpacity="65">
          <Donate />
        </SectionWrapper>

        <SectionWrapper id="contact" bgImage="/contact.png" overlayOpacity="65">
          <Contact />
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  );
}

export default App;
