import { HeroSection } from "./HeroSection";
import HowItWorks from "./HowItWorks";
import FeaturesSection from "./Features";
import LeaderboardFeat from "./LeaderboardFeat";
import CTASection from "./CTASection";
import QuizFeat from "./Quizfeat";
import { Outlet } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <div className="text-secondary font-poppins">
        <HeroSection />
        <FeaturesSection />
        <LeaderboardFeat />
        <QuizFeat />    
        <HowItWorks />
        <CTASection />
        <Outlet/>
      </div>
    </>
  );
}
