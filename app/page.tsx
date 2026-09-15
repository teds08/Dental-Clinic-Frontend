import { Navbar } from "@/components/landingpage/Navbar";
import { Hero } from "@/components/landingpage/Hero";
import { Services } from "@/components/landingpage/Services";
import { About } from "@/components/landingpage/About";
import { WhyChooseUs } from "@/components/landingpage/WhyChooseUs";
import { Testimonials } from "@/components/landingpage/Testimonials";
import { Contact } from "@/components/landingpage/Contact";
import { Footer } from "@/components/landingpage/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
