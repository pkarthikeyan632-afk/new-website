import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero";
import FeaturedWork from "./sections/FeaturedWork";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Learning from "./sections/Learning";
import { learning } from "./data/learning";
import "./App.css";

export default function App() {
  return (
    <div className="page">
      <main className="main">
        <Navbar />
        <Hero />
        <FeaturedWork />
        <Experience />
        <Skills />
      </main>
      <aside className="sidebar">
        <About />
        <Contact />
        <Learning learning={learning} />
      </aside>
    </div>
  );
}