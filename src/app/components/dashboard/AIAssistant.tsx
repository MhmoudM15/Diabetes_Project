import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  Send, 
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  Activity,
  Clock,
  Lightbulb
} from "lucide-react";
import { Button } from "../ui/button";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const suggestedPrompts = [
  {
    icon: TrendingUp,
    text: "Why is my glucose high today?",
    color: "blue"
  },
  {
    icon: UtensilsCrossed,
    text: "What should I eat tonight?",
    color: "green"
  },
  {
    icon: Activity,
    text: "Explain my glucose trend.",
    color: "purple"
  },
  {
    icon: Clock,
    text: "When should I check my glucose next?",
    color: "orange"
  }
];

const colorConfig = {
  blue: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  green: "bg-green-50 text-green-700 hover:bg-green-100",
  purple: "bg-purple-50 text-purple-700 hover:bg-purple-100",
  orange: "bg-orange-50 text-orange-700 hover:bg-orange-100"
};

// Mock AI responses
const getAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("high") || lowerMessage.includes("glucose") && lowerMessage.includes("today")) {
    return {
      content: `Based on your glucose data, I've noticed a few factors that may have contributed to your elevated glucose levels today:

**Primary Factors:**
• Your last meal contained approximately 60g of carbohydrates, which is higher than your typical lunch
• Your last insulin dose was taken 3.5 hours ago, and the timing may not have aligned optimally with your carb intake
• You've been relatively sedentary today with minimal physical activity

**Current Reading:** Your glucose is at 142 mg/dL, which is moderately elevated but not critical.

**Recommendations:**
1. Consider a 10-15 minute walk to help lower glucose naturally
2. Stay hydrated - drink water throughout the afternoon
3. Plan your next meal with lower carb content (aim for 30-40g)
4. Monitor your glucose in 1-2 hours to track the trend

Would you like specific meal suggestions for dinner?`,
      suggestions: [
        "Show me low-carb dinner options",
        "What exercises can help?",
        "Should I adjust my insulin?"
      ]
    };
  }
  
  if (lowerMessage.includes("eat") || lowerMessage.includes("meal") || lowerMessage.includes("dinner")) {
    return {
      content: `Great question! Based on your current glucose level (142 mg/dL) and today's pattern, I recommend a balanced, low-carb dinner. Here are my top suggestions:

**Recommended Meals:**

🥗 **Grilled Salmon with Quinoa** (420 cal, 32g carbs)
- High in omega-3 fatty acids
- Good protein content to stabilize glucose
- Fiber-rich quinoa for sustained energy

🍗 **Greek Salad with Grilled Chicken** (340 cal, 18g carbs)
- Very low carb option
- Mediterranean diet benefits
- High protein and healthy fats

🥦 **Vegetable Stir-Fry with Tofu** (310 cal, 28g carbs)
- Plant-based protein
- Lots of fiber from vegetables
- Low glycemic impact

**General Guidelines:**
• Aim for 30-40g carbs total
• Include lean protein (chicken, fish, tofu)
• Add non-starchy vegetables
• Limit refined carbohydrates

Would you like a detailed recipe for any of these meals?`,
      suggestions: [
        "Get recipe for grilled salmon",
        "What about dessert options?",
        "How much should I portion?"
      ]
    };
  }
  
  if (lowerMessage.includes("trend") || lowerMessage.includes("explain") || lowerMessage.includes("pattern")) {
    return {
      content: `I've analyzed your glucose data from the past 7 days. Here's what I've observed:

**Overall Trend:** Generally stable with occasional moderate spikes

**Key Patterns:**
📈 **Morning Readings:** Consistently between 95-120 mg/dL - excellent fasting control
📊 **Post-Meal Spikes:** Some elevation after lunch (140-155 mg/dL range)
📉 **Evening Levels:** Good control before bedtime (100-115 mg/dL)

**Positive Observations:**
✓ Your fasting glucose is well-controlled
✓ No severe hypoglycemic episodes detected
✓ Good overnight stability

**Areas for Improvement:**
• Post-lunch glucose tends to spike - consider reducing lunch carbs by 10-15g
• There's a pattern of higher readings on weekends - possibly due to different meal timing
• Mid-afternoon readings show some variability

**AI Prediction:**
Based on current trends, your glucose management is good overall. Focus on lunch portion control and you should see even better stability.

**Recommended Actions:**
1. Keep logging your meals consistently
2. Try reducing lunch carbs to 40-45g
3. Consider a short walk after lunch
4. Continue your current evening routine - it's working well!`,
      suggestions: [
        "How can I improve lunch control?",
        "Show my weekly average",
        "Compare to last month"
      ]
    };
  }

  if (lowerMessage.includes("when") || lowerMessage.includes("check") || lowerMessage.includes("test")) {
    return {
      content: `Based on your current glucose level and daily routine, here's your personalized testing schedule:

**Recommended Testing Times Today:**

🌅 **Fasting (Morning):** ✓ Already completed - 118 mg/dL
☀️ **Before Lunch:** Consider testing - helps guide meal choices
🍽️ **2 Hours After Lunch:** Recommended - you had a higher-carb meal
🌙 **Before Bedtime:** Important - ensures safe overnight levels

**Next Check Recommendation:**
⏰ **In 1 hour** (around 3:45 PM) to monitor your current glucose trend after your recent meal

**Why This Timing?**
• Your glucose was 142 mg/dL earlier, slightly elevated
• Testing in 1 hour helps us see if it's rising, stable, or falling
• This data will help optimize your dinner planning

**General Guidelines:**
• Test before meals to guide food choices
• Check 2 hours after meals to see glucose response
• Always test if you feel symptoms (dizzy, shaky, confused)
• Test before exercise and before bed

Set up a reminder? I can help you create automated testing reminders.`,
      suggestions: [
        "Set up testing reminders",
        "What if I feel symptoms?",
        "Explain target ranges"
      ]
    };
  }
  
  // Default response
  return {
    content: `I'm here to help you manage your diabetes! I can assist with:

• 📊 Analyzing your glucose trends and patterns
• 🍽️ Providing personalized meal recommendations
• 💊 Answering questions about medications and timing
• 🏃 Suggesting exercise and lifestyle adjustments
• ⚠️ Explaining your alerts and what actions to take
• 📈 Predicting future glucose levels based on your data

What would you like to know more about?`,
    suggestions: [
      "Why is my glucose high today?",
      "What should I eat tonight?",
      "Explain my glucose trend."
    ]
  };
};

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hello! I'm your AI Health Assistant. I'm here to help you manage your diabetes by answering questions about your glucose levels, diet, medications, and overall health.

How can I assist you today?`,
      timestamp: new Date(),
      suggestions: suggestedPrompts.map(p => p.text)
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponseData = getAIResponse(textToSend);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponseData.content,
        timestamp: new Date(),
        suggestions: aiResponseData.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit" 
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2" style={{ fontSize: "2rem" }}>AI Health Assistant</h1>
        <p className="text-gray-600" style={{ fontSize: "1.125rem" }}>
          Get personalized health guidance and answers to your diabetes questions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border-2 border-gray-200 rounded-3xl shadow-sm flex flex-col"
            style={{ height: "calc(100vh - 280px)", minHeight: "600px" }}
          >
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-6 border-b-2 border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium" style={{ fontSize: "1.125rem" }}>
                  DiabetesAI Assistant
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-gray-600">Online & Ready to Help</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                      {/* Message Bubble */}
                      <div
                        className={`
                          rounded-3xl px-6 py-4 ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }
                        `}
                      >
                        {message.type === "ai" && (
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-600">AI Assistant</span>
                          </div>
                        )}
                        <div className="whitespace-pre-line leading-relaxed">
                          {message.content}
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className={`mt-1 px-2 text-xs text-gray-500 ${
                        message.type === "user" ? "text-right" : "text-left"
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>

                      {/* Suggested Follow-ups */}
                      {message.type === "ai" && message.suggestions && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-gray-600 px-2 flex items-center gap-1">
                            <Lightbulb className="w-3 h-3" />
                            Suggested follow-ups:
                          </p>
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSendMessage(suggestion)}
                              className="w-full text-left px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-all"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-3xl px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t-2 border-gray-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your diabetes management..."
                  className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar - Suggested Prompts */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm"
          >
            <h3 className="text-gray-900 font-medium mb-4" style={{ fontSize: "1.125rem" }}>
              Quick Questions
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Click any question to get started
            </p>
            <div className="space-y-3">
              {suggestedPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    onClick={() => handleSendMessage(prompt.text)}
                    className={`
                      w-full text-left p-4 rounded-2xl border-2 border-gray-200
                      hover:shadow-md transition-all
                      ${colorConfig[prompt.color as keyof typeof colorConfig]}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-relaxed">
                        {prompt.text}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Tips Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <h3 className="text-gray-900 font-medium">Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Ask about your glucose trends and patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Get personalized meal recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Request exercise suggestions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Understand your medication timing</span>
              </li>
            </ul>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4"
          >
            <p className="text-xs text-orange-800 leading-relaxed">
              <strong>Medical Disclaimer:</strong> This AI assistant provides general guidance only. 
              Always consult your healthcare provider for medical decisions. In emergencies, call 911.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
