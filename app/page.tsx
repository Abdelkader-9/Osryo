import Cta from "@/components/Cta";
import { FeaturedCaseStudies } from "@/components/FeaturedCaseStudies";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ServicesPreview } from "@/components/ServicesPreview";

export default function Home() {
  return (
    <main >
      <Navigation />
      <Hero/>
      <ServicesPreview/>
      <FeaturedCaseStudies/>
      <Cta/>
      <Footer/>
    </main>
  );
}
