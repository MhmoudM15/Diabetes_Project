import { Droplet, UtensilsCrossed, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

const actions = [
  {
    icon: Droplet,
    label: "Log Glucose",
    color: "blue",
    description: "Record your blood sugar",
    action: "log-glucose",
  },
  {
    icon: UtensilsCrossed,
    label: "Log Meal",
    color: "green",
    description: "Track what you eat",
    action: "meals",
  },
  {
    icon: MessageSquare,
    label: "Ask AI Assistant",
    color: "purple",
    description: "Get personalized advice",
    action: "assistant",
  },
];

const colorConfig = {
  blue: {
    bg: "bg-blue-600 hover:bg-blue-700",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-600 hover:bg-green-700",
    icon: "text-green-600",
  },
  purple: {
    bg: "bg-purple-600 hover:bg-purple-700",
    icon: "text-purple-600",
  },
};

interface QuickActionsProps {
  onActionClick?: (action: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-gray-900 mb-1" style={{ fontSize: "1.25rem" }}>
          Quick Actions
        </h3>
        <p className="text-gray-600 text-sm">Log your health data</p>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const colors = colorConfig[action.color as keyof typeof colorConfig];

          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Button
                onClick={() => onActionClick?.(action.action)}
                className={`w-full ${colors.bg} text-white rounded-2xl py-6 px-6 shadow-md hover:shadow-lg transition-all`}
                style={{ fontSize: "1rem" }}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm opacity-90">{action.description}</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}