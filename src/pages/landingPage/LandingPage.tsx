import { HeroSection } from "./HeroSection";
import HowItWorks from "./HowItWorks";
import FeaturesSection from "./Features";
import LiveLeaderboard from "./LiveLeaderBoardPreview";
import CTASection from "./CTASection";

export default function LandingPage() {
  return (
    <>
      <div className="text-secondary font-poppins">
        <HeroSection />
        <FeaturesSection />
        <LiveLeaderboard />
        <CTASection />
        <HowItWorks />
      </div>
    </>
  );
}
