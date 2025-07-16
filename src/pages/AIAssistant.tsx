import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Lightbulb, BookOpen, Calendar, GraduationCap } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const examplePrompts = [
  {
    icon: BookOpen,
    title: "Course Planning",
    prompt: "What courses should I take next semester for my Computer Science degree?"
  },
  {
    icon: GraduationCap,
    title: "CODO Guidance",
    prompt: "I want to change my major to Computer Science. What are the requirements?"
  },
  {
    icon: Calendar,
    title: "Prerequisites",
    prompt: "What are the prerequisites for CS 251 Data Structures?"
  },
  {
    icon: Lightbulb,
    title: "Academic Planning",
    prompt: "Help me plan my course schedule to graduate in 4 years"
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Boiler AI assistant. I'm here to help you with course planning, degree requirements, and academic guidance. What would you like to know?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're looking for academic guidance. Let me help you with that. Could you provide more details about your current major and academic year so I can give you more personalized recommendations?",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-8rem)]">
          {/* Example Prompts Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Start</h2>
              <div className="space-y-3">
                {examplePrompts.map((example, index) => (
                  <Card 
                    key={index}
                    className="p-4 cursor-pointer transition-refined hover-lift"
                    onClick={() => handlePromptClick(example.prompt)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="rounded-md bg-muted p-2">
                        <example.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-foreground">{example.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{example.prompt}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">AI Academic Assistant</h1>
                <p className="mt-2 text-muted-foreground">
                  Get personalized guidance for your academic journey at Purdue University
                </p>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-card rounded-lg border border-border p-6 mb-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <div className={`rounded-full p-2 ${
                        message.sender === "ai" ? "bg-primary" : "bg-muted"
                      }`}>
                        {message.sender === "ai" ? (
                          <Bot className={`h-4 w-4 ${
                            message.sender === "ai" ? "text-primary-foreground" : "text-muted-foreground"
                          }`} />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`rounded-lg p-4 ${
                          message.sender === "ai" 
                            ? "bg-muted" 
                            : "bg-primary text-primary-foreground"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about courses, requirements, planning..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}