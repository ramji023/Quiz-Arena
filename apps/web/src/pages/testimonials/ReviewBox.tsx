import { motion } from "motion/react";
import { userReview } from "./userReview";
import { Star } from "lucide-react";
const ReviewBox = ({
  testimonial,
  index,
}: {
  testimonial: (typeof userReview)[0];
  index: number;
}) => (
  <motion.div
    className="flex-shrink-0 flex flex-col items-start w-[350px] p-6 rounded-2xl bg-secondary backdrop-blur-sm border border-border/50 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink to-pink-400 flex items-center justify-center text-primary-foreground font-bold text-sm">
        {testimonial.avatar}
      </div>
      <div className="flex flex-col items-start">
        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>

    <div className="flex gap-1 mb-3">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>

    <p className="text-[#845275] leading-relaxed mb-4">
      "{testimonial.content}"
    </p>

    <p className="text-xs text-[#845275]/70">{testimonial.date}</p>
  </motion.div>
);

export default ReviewBox