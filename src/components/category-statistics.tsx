"use client";

import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

type CategoryStat = {
  category: string;
  total: number;
};

const COLORS = [
  "#2E7D32",
  "#43A047",
  "#66BB6A",
  "#81C784",
  "#A5D6A7",
  "#C8E6C9",
];

export default function CategoryStatistics() {
  const { data = [], isLoading } = useQuery<CategoryStat[]>({
    queryKey: ["category-statistics"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/stats/categories`
      );

      return res.json();
    },
  });

  return (
    <section className="py-12 bg-[#F9F6EE]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-12"
        >
             <p className="text-primary-green font-semibold mb-3">
            Observe Statistics
          </p>
          <h2 className="text-4xl font-bold text-primary-dark">
            Plant Collection Statistics
          </h2>

          <p className="mt-3 text-gray-600">
            Discover which plant categories are most popular inside PlantPal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >

          {isLoading ? (
            <div className="h-[450px] flex items-center justify-center">
              Loading statistics...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={450}>
              <PieChart>

                <Pie
                  data={data}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={(props: any) =>
  `${props.name} ${((props.percent ?? 0) * 100).toFixed(0)}%`
}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.category}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>
            </ResponsiveContainer>
          )}

        </motion.div>

      </div>
    </section>
  );
}