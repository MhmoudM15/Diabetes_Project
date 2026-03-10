import { CheckCircle } from "lucide-react";

export function StatusSummaryCard() {
  const summary = {
    message: "Your glucose levels have remained within the 70-140 mg/dL target range for 92% of the day.",
    status: "good" as const
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">Status Summary</p>
        <div className="w-2 h-2 bg-green-500 rounded-full" />
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">
        {summary.message}
      </p>
    </div>
  );
}
