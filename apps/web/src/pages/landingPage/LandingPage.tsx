import { HeroSection } from "./HeroSection";
import HowItWorks from "./HowItWorks";
import FeaturesSection from "./Features";
import LeaderboardFeat from "./LeaderboardFeat";
import CTASection from "./CTASection";
import QuizFeat from "./Quizfeat";
import { Outlet } from "react-router-dom";
import Testimonials from "../testimonials/Testimonial";

export default function LandingPage() {
  return (
    <>
      <div className="text-secondary font-poppins overflow-hidden">
        <HeroSection />
        <FeaturesSection />
        <LeaderboardFeat />
        <QuizFeat />    
        <HowItWorks />
        <Testimonials/>
        <CTASection />
        <Outlet/>
      </div>
    </>
  );
}
