import { useEffect, useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
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
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut"
      }}
      className="snap-start relative mx-4 md:mx-20 rounded-[3rem] overflow-hidden mb-24 border border-white/5 shadow-premium"
    >
      {/* Background Container */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ 
          backgroundImage: `url('${bgImage}')`, 
          backgroundSize: "cover", 
          backgroundPosition: "center",
        }}
      />
      
      {/* Dark overlay */}
      <div className={`absolute inset-0 bg-slate-950/${overlayOpacity}`} />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
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

    // Set a noticeable base slow motion speed
    video.playbackRate = 0.75;
    video.play().catch(() => {});
    
    // Accelerate with scroll movement
    return smoothVelocity.on("change", (latest) => {
      const velocity = Math.abs(latest);
      if (velocity > 10) {
        // Dynamic ramp up from 0.75x base speed
        const newRate = Math.min(Math.max(0.75 + (velocity / 500), 0.75), 3.5);
        video.playbackRate = newRate;
      } else {
        video.playbackRate = 0.75;
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
      <div className="fixed inset-0 -z-20 h-full w-full overflow-hidden bg-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vh] h-[180vw] rotate-90">
          <video 
            key="bg-video"
            ref={videoRef}
            autoPlay
            loop
            muted 
            playsInline 
            className="h-full w-full object-cover"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
        </div>
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
