import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Offers from "@/components/Offers";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <WhyChooseUs />
        <About />
        <Offers />
        <FAQ />
        <Contact />
        <div className="py-16 bg-background">
          <NewsletterSubscription />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
