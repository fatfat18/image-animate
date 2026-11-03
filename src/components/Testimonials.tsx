import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Product Manager at TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    testimonial:
      "This platform has completely transformed how our team approaches web development. The intuitive interface and powerful features make it an absolute game-changer.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Lead Designer at Creative Studios",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    testimonial:
      "Outstanding experience from start to finish. The attention to detail and customer support is unmatched. Highly recommend to anyone in the industry.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "CEO of Digital Innovations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    testimonial:
      "We've seen a 300% increase in productivity since implementing this solution. It's rare to find a product that delivers on its promises so consistently.",
    rating: 5,
  },
  {
    id: 4,
    name: "James Wilson",
    title: "CTO at StartupHub",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    testimonial:
      "The technical support team goes above and beyond. Their expertise and responsiveness have been instrumental to our success.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Anderson",
    title: "Founder of Design Co.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    testimonial:
      "Best investment we've made. The ROI has been phenomenal, and our clients are more impressed than ever with the results.",
    rating: 5,
  },
  {
    id: 6,
    name: "David Park",
    title: "Project Lead at Global Tech",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    testimonial:
      "Seamless integration, incredible performance, and a team that genuinely cares about your success. This is what customer service should look like.",
    rating: 5,
  },
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger animation
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 px-4 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Loved by Professionals
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Hear what our satisfied clients have to say about their experience with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-slate-200 mb-8 leading-relaxed h-24 line-clamp-4">
                "{testimonial.testimonial}"
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-6"></div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400/30 group-hover:border-cyan-400 transition-colors"
                />
                <div>
                  <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                  <p className="text-cyan-300 text-xs">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-slate-400 mb-6">Join thousands of satisfied professionals</p>
          <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
            Get Started Today
          </button>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-white/10">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2">
              10K+
            </h3>
            <p className="text-slate-400">Happy Clients</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text mb-2">
              98%
            </h3>
            <p className="text-slate-400">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-2">
              50+
            </h3>
            <p className="text-slate-400">Awards Won</p>
          </div>
        </div>
      </div>
    </div>
  );
}
