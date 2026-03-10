import { useState } from "react";
import { motion } from "motion/react";
import { 
  Activity, 
  Brain, 
  UtensilsCrossed, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  Wheat,
  ThumbsUp,
  X,
  Plus
} from "lucide-react";
import { Button } from "../ui/button";
import { MealCard } from "./DietRecommendationsMealCard";

interface Meal {
  id: string;
  name: string;
  image: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  suitability: number;
  description: string;
  ingredients: string[];
  prepTime: string;
}

const recommendedMeals: Meal[] = [
  {
    id: "1",
    name: "Grilled Salmon with Quinoa",
    image: "grilled-salmon-quinoa",
    calories: 420,
    carbs: 32,
    protein: 38,
    fat: 14,
    fiber: 6,
    suitability: 95,
    description: "Omega-3 rich salmon with fiber-packed quinoa and steamed vegetables",
    ingredients: ["Salmon fillet", "Quinoa", "Broccoli", "Olive oil", "Lemon"],
    prepTime: "25 min"
  },
  {
    id: "2",
    name: "Greek Salad with Chicken",
    image: "greek-salad-chicken",
    calories: 340,
    carbs: 18,
    protein: 32,
    fat: 16,
    fiber: 5,
    suitability: 92,
    description: "Fresh Mediterranean salad with grilled chicken and feta cheese",
    ingredients: ["Chicken breast", "Cucumber", "Tomato", "Feta", "Olives"],
    prepTime: "15 min"
  },
  {
    id: "3",
    name: "Vegetable Stir-Fry with Tofu",
    image: "vegetable-stir-fry",
    calories: 310,
    carbs: 28,
    protein: 18,
    fat: 12,
    fiber: 7,
    suitability: 88,
    description: "Colorful low-carb vegetables with plant-based protein",
    ingredients: ["Tofu", "Bell peppers", "Broccoli", "Snap peas", "Ginger"],
    prepTime: "20 min"
  },
  {
    id: "4",
    name: "Turkey & Avocado Wrap",
    image: "turkey-wrap",
    calories: 380,
    carbs: 35,
    protein: 28,
    fat: 14,
    fiber: 8,
    suitability: 85,
    description: "Whole wheat wrap with lean turkey and healthy fats",
    ingredients: ["Turkey breast", "Avocado", "Spinach", "Whole wheat wrap"],
    prepTime: "10 min"
  }
];

const foodsToAvoid = [
  { name: "White Bread & Pastries", reason: "High glycemic index, rapid glucose spike", risk: "high" },
  { name: "Sugary Drinks & Soda", reason: "Pure sugar with no nutritional value", risk: "high" },
  { name: "Fried Foods", reason: "High in unhealthy fats and calories", risk: "high" },
  { name: "White Rice & Pasta", reason: "Refined carbs cause blood sugar surge", risk: "medium" },
  { name: "Candy & Sweets", reason: "Direct impact on glucose levels", risk: "high" },
  { name: "Processed Snacks", reason: "High in sodium and simple carbs", risk: "medium" },
];

export function DietRecommendations() {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentGlucose = 142;
  const riskLevel = "Moderate";

  const handleLogMeal = (meal: Meal) => {
    setShowSuccess(true);
    setSelectedMeal(null);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const riskConfig = {
    Low: { color: "text-green-700", bgColor: "bg-green-50", borderColor: "border-green-200" },
    Moderate: { color: "text-orange-700", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
    High: { color: "text-red-700", bgColor: "bg-red-50", borderColor: "border-red-200" },
  };

  const currentRiskConfig = riskConfig[riskLevel as keyof typeof riskConfig];

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-3"
        >
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <p className="text-green-700 font-medium">Meal logged successfully!</p>
        </motion.div>
      )}

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2" style={{ fontSize: "2rem" }}>AI Diet Recommendations</h1>
        <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
          Personalized meal suggestions based on your glucose levels
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Current Status - Full Width at Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`bg-white border-2 ${currentRiskConfig.borderColor} rounded-3xl p-6 shadow-sm`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 ${currentRiskConfig.bgColor} rounded-xl flex items-center justify-center`}>
              <Activity className={`w-6 h-6 ${currentRiskConfig.color}`} />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium" style={{ fontSize: "1.125rem" }}>
                Current Status
              </h3>
              <p className="text-gray-600 text-sm">Updated 5 min ago</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Glucose Level</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl text-gray-900 font-medium">{currentGlucose}</span>
                <span className="text-gray-600">mg/dL</span>
              </div>
            </div>

            <div className={`${currentRiskConfig.bgColor} rounded-2xl p-4`}>
              <p className="text-sm text-gray-600 mb-1">Risk Level</p>
              <p className={`text-2xl font-medium ${currentRiskConfig.color}`}>{riskLevel}</p>
            </div>
          </div>
        </motion.div>

        {/* Recommended Meals - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem" }}>
              Recommended Meals
            </h2>
            <p className="text-gray-600">
              Meals optimized for your current glucose level and health goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedMeals.map((meal, index) => (
              <MealCard
                key={meal.id}
                meal={meal}
                index={index}
                onViewDetails={setSelectedMeal}
                onLogMeal={handleLogMeal}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Row - AI Diet Advisor and Foods to Avoid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Diet Advisor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium mb-2" style={{ fontSize: "1.125rem" }}>
                  AI Diet Advisor
                </h3>
                <div className="bg-blue-50 rounded-2xl p-4">
                  <p className="text-blue-700 text-sm leading-relaxed">
                    Your glucose trend indicates moderate risk. Choose low-carb meals with high fiber 
                    and lean protein to help stabilize your levels over the next few hours.
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Focus on complex carbohydrates</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Include lean protein in every meal</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Stay hydrated throughout the day</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Foods to Avoid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white border-2 border-red-200 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium" style={{ fontSize: "1.125rem" }}>
                  Foods to Avoid
                </h3>
                <p className="text-gray-600 text-sm">May increase glucose risk</p>
              </div>
            </div>

            <div className="space-y-3">
              {foodsToAvoid.map((food, index) => (
                <motion.div
                  key={food.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className={`p-3 rounded-xl border-2 ${
                    food.risk === "high" 
                      ? "bg-red-50 border-red-200" 
                      : "bg-orange-50 border-orange-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <X className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      food.risk === "high" ? "text-red-600" : "text-orange-600"
                    }`} />
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${
                        food.risk === "high" ? "text-red-900" : "text-orange-900"
                      }`}>
                        {food.name}
                      </p>
                      <p className={`text-xs mt-0.5 ${
                        food.risk === "high" ? "text-red-700" : "text-orange-700"
                      }`}>
                        {food.reason}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Meal Details Modal */}
      {selectedMeal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMeal(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.875rem" }}>
                    {selectedMeal.name}
                  </h2>
                  <p className="text-gray-600">{selectedMeal.description}</p>
                </div>
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Detailed Nutrition */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-gray-900 font-medium mb-4">Nutritional Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Calories</p>
                    <p className="text-2xl font-medium text-gray-900">{selectedMeal.calories}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Carbs</p>
                    <p className="text-2xl font-medium text-gray-900">{selectedMeal.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Protein</p>
                    <p className="text-2xl font-medium text-gray-900">{selectedMeal.protein}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Fat</p>
                    <p className="text-2xl font-medium text-gray-900">{selectedMeal.fat}g</p>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-medium mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMeal.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prep Time & Suitability */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-2xl p-4">
                  <p className="text-sm text-green-700 mb-1">Preparation Time</p>
                  <p className="text-2xl font-medium text-green-900">{selectedMeal.prepTime}</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-4">
                  <p className="text-sm text-green-700 mb-1">Suitability Score</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-medium text-green-900">{selectedMeal.suitability}%</p>
                    <ThumbsUp className="w-5 h-5 text-green-700" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => handleLogMeal(selectedMeal)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 transition-all"
                style={{ fontSize: "1.125rem" }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Log This Meal
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}