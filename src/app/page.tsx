import { Faqs } from "@/components/faqs";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { PrimaryFeatures } from "@/components/primary-features";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
