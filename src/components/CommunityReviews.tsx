"use client";

import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaLeaf } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    plant: "Monstera Deliciosa",
    rating: 5,
    review:
      "PlantPal completely changed how I care for my plants. The watering reminders and care tips have saved several of my indoor plants.",
  },
  {
    id: 2,
    name: "Michael Brown",
    plant: "Snake Plant",
    rating: 5,
    review:
      "The AI assistant answered every question I had about sunlight and watering. It feels like having a gardening expert available 24/7.",
  },
  {
    id: 3,
    name: "Emma Wilson",
    plant: "Peace Lily",
    rating: 4,
    review:
      "I love browsing the community plants. I've discovered so many beautiful species I never knew existed before.",
  },
  
  
  
];

export default function CommunityReviews() {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-green font-semibold uppercase tracking-widest">
            Community Reviews
          </span>

          <h2 className="text-4xl lg:text-5xl font-black text-primary-dark mt-3">
            Loved by Plant Enthusiasts
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-gray-600">
            Hear what members of the PlantPal community have to say about
            discovering plants, learning care tips, and growing healthier
            gardens.
          </p>
        </motion.div>

        {/* Review Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {reviews.map((review, index) => (

            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl border border-green-100 transition-all"
            >

              {/* Quote */}

              <div className="w-14 h-14 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6">
                <FaQuoteLeft className="text-primary-green text-2xl" />
              </div>

              {/* Review */}

              <p className="text-gray-600 leading-8 mb-8">
                "{review.review}"
              </p>

              {/* Stars */}

              <div className="flex gap-1 mb-6">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-yellow-400"
                  />
                ))}
              </div>

              {/* Footer */}

              <div className="flex justify-between items-center border-t border-gray-100 pt-5">

                <div>
                  <h3 className="font-bold text-primary-dark">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    PlantPal Member
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-primary-green/10 px-3 py-2 rounded-full text-primary-green text-sm font-medium">
                  <FaLeaf />
                  {review.plant}
                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}