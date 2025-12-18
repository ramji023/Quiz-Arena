import { motion } from "motion/react";
import { userReview } from "./userReview";
import ReviewBox from "./ReviewBox";

export default function Testimonials() {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...userReview, ...userReview];

  return (
    <>
      <section className="px-5 bg-bg py-20 text-primary">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-semibold mb-4"
          >
            What Our User Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            Join thousands of happy users who have transformed their learning
            experience
          </motion.p>
        </div>
        {/* Floating testimonials row */}
        <div className="relative">
          <motion.div
            className="flex gap-6 py-4"
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

          {/* Gradient overlays for fade effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-muted/30 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none" />
        </div>
      </section>
    </>
  );
}
