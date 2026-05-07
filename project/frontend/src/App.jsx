import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-b from-[#0f1613] via-[#111a22] to-[#1c1711] text-slate-100">
      <CustomCursor />
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section id="home" className="snap-start">
          <Home />
        </section>
        <section id="about" className="snap-start">
          <About />
        </section>
        <section id="services" className="snap-start">
          <Services />
        </section>
        <section id="donate" className="snap-start">
          <Donate />
        </section>
        <section id="contact" className="snap-start">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
