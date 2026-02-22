import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CEOSection from "@/components/CEOSection";
import AwardValues from "@/components/AwardValues";
import StepsTimeline from "@/components/StepsTimeline";
import AwardTimeline from "@/components/AwardTimeline";
import AwardsSection from "@/components/AwardsSection";
import HomeSections from "@/components/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CEOSection />
      <AwardValues />
      <StepsTimeline />
      <AwardTimeline />
      <AwardsSection />
      <HomeSections />
    </>
  );
}
