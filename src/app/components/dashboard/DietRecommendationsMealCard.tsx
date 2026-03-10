import { motion } from "motion/react";
import {
  UtensilsCrossed,
  ChevronRight,
  Flame,
  Wheat,
  ThumbsUp,
  Plus
} from "lucide-react";
import { Button } from "../ui/button";

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
}

interface MealCardProps {
  meal: Meal;
  index: number;
  onViewDetails: (meal: Meal) => void;
  onLogMeal: (meal: Meal) => void;
}

export function MealCard({ meal, index, onViewDetails, onLogMeal }: MealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Meal Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <UtensilsCrossed className="w-16 h-16 text-gray-300" />
      </div>

      <div className="p-6">
        {/* Meal Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-gray-900 font-medium pr-2" style={{ fontSize: "1.125rem" }}>
              {meal.name}
            </h3>
            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-lg flex-shrink-0">
              <ThumbsUp className="w-3 h-3 text-green-700" />
              <span className="text-sm font-medium text-green-700">{meal.suitability}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">{meal.description}</p>
        </div>

        {/* Nutrition Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-orange-600" />
              <span className="text-xs text-gray-600">Calories</span>
            </div>
            <p className="text-lg font-medium text-gray-900">{meal.calories}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Wheat className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Carbs</span>
            </div>
            <p className="text-lg font-medium text-gray-900">{meal.carbs}g</p>
          </div>
        </div>

        {/* Macros Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Protein: {meal.protein}g</span>
            <span>Fat: {meal.fat}g</span>
            <span>Fiber: {meal.fiber}g</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
            <div 
              className="bg-blue-500" 
              style={{ width: `${(meal.protein / (meal.protein + meal.fat + meal.carbs)) * 100}%` }}
            />
            <div 
              className="bg-yellow-500" 
              style={{ width: `${(meal.fat / (meal.protein + meal.fat + meal.carbs)) * 100}%` }}
            />
            <div 
              className="bg-green-500" 
              style={{ width: `${(meal.carbs / (meal.protein + meal.fat + meal.carbs)) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => onViewDetails(meal)}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 rounded-xl py-2 transition-all"
          >
            <span className="text-sm">View Details</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            onClick={() => onLogMeal(meal)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 transition-all"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span className="text-sm">Log Meal</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}