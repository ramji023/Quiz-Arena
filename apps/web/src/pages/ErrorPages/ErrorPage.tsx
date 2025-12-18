import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import useErrorStore from "../../stores/errorStore";
import { Button } from "@repo/ui/components/ui/Button";

export default function ErrorPage() {
  const navigate = useNavigate();
  const { message, clearError, type } = useErrorStore();
  const handleGoHome = () => {
    clearError();
    navigate("/home");
  };

  const handleRetry = () => {
    clearError();
    window.location.reload();
  };

  return (
    <div className="min-h-[90%] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Animated warning stripes */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              hsl(var(--destructive)) 20px,
              hsl(var(--destructive)) 40px
            )`,
          }}
        />
      </div>

      {/* Pulsing danger circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-destructive/20 blur-2xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/15 blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className=" text-pink relative z-10 text-center max-w-xl mx-auto">
        {/* Animated error icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <div className="relative inline-flex">
            {/* Outer ring */}
            <motion.div
              className=" text-pink absolute inset-0 rounded-full border-4 border-destructive/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: "120px", height: "120px", margin: "-10px" }}
            />

            {/* Main icon container */}
            <div className="w-24 h-24 rounded-full bg-red-200 backdrop-blur-sm border border-destructive/40 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-primary text-4xl md:text-5xl font-display font-bold text-secondary-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {type}
        </motion.h1>

        {/* Message */}
        <motion.p
          className="text-md text-primary-shadow mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {message}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button onClick={handleRetry} size="lg" variant="primary">
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button onClick={handleGoHome} size="lg" variant="secondary">
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        {/* Status indicator */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2 text-sm text-secondary-foreground/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Our team is working on it</span>
        </motion.div>
      </div>
    </div>
  );
}
