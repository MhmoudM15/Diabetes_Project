import { UtensilsCrossed, Check } from "lucide-react";
import { motion } from "motion/react";

const meals = [
  {
    name: "Grilled Chicken Salad",
    type: "Lunch",
    impact: "Low glucose impact",
    calories: 320,
    recommended: true,
  },
  {
    name: "Quinoa Bowl with Vegetables",
    type: "Dinner",
    impact: "Moderate glucose impact",
    calories: 380,
    recommended: true,
  },
  {
    name: "Greek Yogurt with Berries",
    type: "Snack",
    impact: "Low glucose impact",
    calories: 150,
    recommended: true,
  },
  {
    name: "Oatmeal with Nuts",
    type: "Breakfast",
    impact: "Moderate glucose impact",
    calories: 280,
    recommended: true,
  },
];

export function MealRecommendations() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
          <UtensilsCrossed className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-gray-900" style={{ fontSize: "1.25rem" }}>
            Meal Recommendations
          </h3>
          <p className="text-gray-600 text-sm">AI-suggested foods based on your glucose</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {meals.map((meal, index) => (
          <motion.div
            key={meal.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-50 rounded-2xl p-4 hover:bg-green-50 transition-colors cursor-pointer border-2 border-transparent hover:border-green-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-gray-900 font-medium">{meal.name}</h4>
                <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full inline-block mt-1">
                  {meal.type}
                </span>
              </div>
              {meal.recommended && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-700">{meal.impact}</p>
              <p className="text-xs text-gray-600">{meal.calories} calories</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-700">
          ✨ These meals are optimized for stable glucose levels
        </p>
      </div>
    </div>
  );
}
