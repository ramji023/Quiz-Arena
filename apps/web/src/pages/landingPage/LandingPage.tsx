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
        <div id="hero">
          <HeroSection />
        </div>
        
        <div id="features">
          <FeaturesSection />
        </div>
        
        <div id="leaderboard">
          <LeaderboardFeat />
        </div>
        
        <div id="quiz">
          <QuizFeat />
        </div>
        
        <div id="how-it-works">
          <HowItWorks />
        </div>
        
        <div id="testimonials">
          <Testimonials />
        </div>
        
        <div id="cta">
          <CTASection />
        </div>
        
        <Outlet />
      </div>
    </>
  );
}