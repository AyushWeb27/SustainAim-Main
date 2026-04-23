import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Loader2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export function AIChatWidget({ isOpen, onClose, isMinimized, onToggleMinimize }: AIChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI sustainability assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const quickQuestions = [
    "How do I track Scope 1 emissions?",
    "What's the difference between Scope 2 and Scope 3?",
    "How can I generate a report?",
    "Help with data entry",
    "Explain carbon footprint calculation",
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("scope 1") || lowerMessage.includes("scope1")) {
      return "Scope 1 emissions are direct greenhouse gas emissions from sources that are owned or controlled by your organization. This includes emissions from:\n\n• Company vehicles and fleet\n• On-site fuel combustion\n• Manufacturing processes\n• Refrigerants and air conditioning\n\nTo track Scope 1 emissions, navigate to the 'Scope 1' section from your dashboard sidebar and click 'Add Record' to enter your data.";
    }

    if (lowerMessage.includes("scope 2") || lowerMessage.includes("scope2")) {
      return "Scope 2 emissions are indirect emissions from the generation of purchased energy, including:\n\n• Purchased electricity\n• Purchased heating and cooling\n• Purchased steam\n\nThese are emissions that occur at the facility where energy is generated, not at your location. Track these in the 'Scope 2' section of your dashboard.";
    }

    if (lowerMessage.includes("scope 3") || lowerMessage.includes("scope3")) {
      return "Scope 3 emissions include all other indirect emissions in your value chain, such as:\n\n• Business travel\n• Employee commuting\n• Waste disposal\n• Purchased goods and services\n• Transportation and distribution\n• Investments\n\nScope 3 is often the largest source of emissions. Access the 'Scope 3' section to begin tracking.";
    }

    if (lowerMessage.includes("report") || lowerMessage.includes("generate")) {
      return "To generate a report:\n\n1. Navigate to the 'AI Reports' section in your dashboard\n2. Choose between GHG Report or ESG Report\n3. Select your date range and reporting period\n4. Choose which scopes to include\n5. Click 'Generate Report'\n6. Review and download your report in PDF format\n\nReports can be customized with your company branding and are compliant with major sustainability frameworks like GRI and TCFD.";
    }

    if (lowerMessage.includes("data entry") || lowerMessage.includes("add") || lowerMessage.includes("enter")) {
      return "Here's how to enter emissions data:\n\n1. Select the appropriate Scope section (1, 2, or 3)\n2. Click the 'Add Record' or 'Add Entry' button\n3. Fill in the required fields:\n   • Date of activity\n   • Category/Type\n   • Quantity/Amount\n   • Unit of measurement\n   • Description (optional)\n4. Click 'Save' to record the entry\n\nBest practice: Enter data regularly (at least monthly) for accurate tracking and reporting.";
    }

    if (lowerMessage.includes("carbon") || lowerMessage.includes("calculation") || lowerMessage.includes("calculate")) {
      return "Carbon footprint calculations use internationally recognized emission factors:\n\n• Activity Data × Emission Factor = CO2e emissions\n\nWe use emission factors from:\n- DEFRA (UK)\n- EPA (US)\n- IPCC Guidelines\n- Custom factors for your industry\n\nThe system automatically converts all measurements to CO2 equivalent (CO2e), which includes CO2, methane, and other greenhouse gases normalized to CO2 impact.";
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I'm here to help with:\n\n✓ Emissions tracking guidance\n✓ Understanding scopes 1, 2, and 3\n✓ Report generation\n✓ Data entry best practices\n✓ Account management\n✓ Navigation and features\n\nWhat specific topic would you like assistance with?";
    }

    if (lowerMessage.includes("branch") || lowerMessage.includes("location")) {
      return "Branch Management allows you to:\n\n• Add multiple branches/locations\n• Track emissions by branch\n• Assign users to specific branches\n• Generate branch-specific reports\n• Compare performance across locations\n\nAccess this from the 'Branch Management' section in your dashboard.";
    }

    if (lowerMessage.includes("user") || lowerMessage.includes("permission") || lowerMessage.includes("access")) {
      return "User Management features:\n\n• Add team members with different roles\n• Set granular permissions (View, Edit, Admin)\n• Control access to specific branches\n• Monitor user activity\n• Manage user profiles\n\nAdmins can manage users from Settings > Team Management.";
    }

    // Default response
    return "Thank you for your question! Based on your query, I recommend:\n\n1. Check the Help & Support documentation\n2. Review the relevant section of your dashboard\n3. Contact your administrator if you need specific permissions\n\nCould you provide more details about what you're trying to accomplish? I'm here to help with emissions tracking, reporting, and platform navigation.";
  };

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`fixed bottom-6 right-6 z-50 flex flex-col bg-white rounded-3xl shadow-2xl border-2 border-neutral-200 overflow-hidden ${
          isMinimized ? "w-96 h-20" : "w-[32rem] h-[42rem]"
        } transition-all duration-300`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-white">AI Support Assistant</h3>
              <p className="text-xs text-emerald-100 font-medium">
                {isTyping ? "Typing..." : "Online"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMinimize}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="w-5 h-5 text-white" />
              ) : (
                <Minimize2 className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.length === 1 && (
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide px-2">
                    Quick Questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="px-3 py-2 bg-white border-2 border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      message.sender === "ai"
                        ? "bg-emerald-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {message.sender === "ai" ? (
                      <Bot className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <User className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div
                    className={`flex-1 ${
                      message.sender === "user" ? "flex justify-end" : ""
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-3 rounded-2xl max-w-[85%] ${
                        message.sender === "ai"
                          ? "bg-white border-2 border-neutral-200 text-neutral-800"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">
                        {message.text}
                      </p>
                      <p
                        className={`text-[10px] mt-2 ${
                          message.sender === "ai"
                            ? "text-neutral-400"
                            : "text-emerald-100"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="bg-white border-2 border-neutral-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t-2 border-neutral-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={inputValue.trim() === "" || isTyping}
                  className="px-5 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-neutral-400 font-medium mt-2 text-center">
                AI-powered responses • Press Enter to send
              </p>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
