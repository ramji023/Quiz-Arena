import { motion } from "motion/react";
import { userReview } from "./userReview";
import ReviewBox from "./ReviewBox";
import { Quote } from "lucide-react";

export default function Testimonials() {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...userReview, ...userReview];

  return (
    <section className="px-5 bg-bg py-10 md:py-12 text-primary relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-card/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-card/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      {/* Floating quote decorations */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        whileInView={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-10 text-card"
      >
        <Quote size={80} strokeWidth={1} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 10 }}
        whileInView={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-20 right-10 text-card transform scale-x-[-1]"
      >
        <Quote size={80} strokeWidth={1} />
      </motion.div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block"
          >
            <span className="text-sm font-semibold tracking-wider uppercase text-pink/80 bg-pink/10 px-4 py-2 rounded-full">
              Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-5xl font-bold"
          >
            What Our{" "}
            <span className="text-box relative">
              Users Say
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C50 2.5 100 1.5 199 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-primary/70 font-poppins"
          >
            Join thousands of happy users who have transformed their learning
            experience with Quiz Arena
          </motion.p>

          {/* Stats below description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 pt-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-box/70 border-2 border-card flex items-center justify-center text-xs font-semibold"
                  >
                    👤
                  </div>
                ))}
              </div>
              <span className="text-sm text-primary/70 font-medium">
                10,000+ Happy Users
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-primary/70 font-medium">
                4.9/5 Rating
              </span>
            </div>
          </motion.div>
        </div>

        {/* Floating testimonials row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-12"
        >
          <div className="relative overflow-hidden py-8">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -2100],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <ReviewBox
                  key={index}
                  testimonial={testimonial}
                  index={index % userReview.length}
                />
              ))}
            </motion.div>

            {/* Enhanced gradient overlays */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-bg via-bg/50 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-bg via-bg/50 to-transparent pointer-events-none z-10" />
          </div>

          {/* Decorative dots pattern */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-30">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-box" />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="text-primary/50 text-sm font-poppins">
            Want to share your experience?
          </p>
          <button className="px-6 py-3 bg-pink hover:bg-pink/70 text-secondary font-semibold rounded-full transition-all duration-300 hover:scale-105 border border-card/20 hover:border-card/40">
            Leave a Review
          </button>
        </motion.div>
      </div>
    </section>
  );
}
