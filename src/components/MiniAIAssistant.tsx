import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Maximize2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MiniAIAssistantProps {
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export function MiniAIAssistant({ isExpanded = false, onToggleExpanded }: MiniAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();

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
        content: "Thanks for your question! I'm here to help with course planning, requirements, and academic guidance.",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleGoToFullAI = () => {
    navigate("/ai-assistant");
  };

  if (!isExpanded) {
    // Compact widget view
    return (
      <Card className="p-4 bg-card border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="rounded-md bg-primary p-1.5">
              <Bot className="h-3 w-3 text-primary-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground">AI Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            className="h-6 w-6 p-0"
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3">
          Need help with course planning?
        </p>
        
        <div className="space-y-2">
          <Button 
            onClick={onToggleExpanded}
            variant="outline" 
            size="sm" 
            className="w-full text-xs h-7"
          >
            Quick Chat
          </Button>
          <Button 
            onClick={handleGoToFullAI}
            className="w-full text-xs h-7 bg-primary hover:bg-primary/90"
          >
            Open Full AI
          </Button>
        </div>
      </Card>
    );
  }

  // Expanded widget view
  return (
    <Card className="p-4 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="rounded-md bg-primary p-1.5">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <h3 className="text-sm font-medium text-foreground">AI Assistant</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoToFullAI}
            className="h-6 w-6 p-0"
            title="Open full AI assistant"
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="h-48 mb-3">
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-2">
              <div className={`rounded-full p-1 ${
                message.sender === "ai" ? "bg-primary" : "bg-muted"
              }`}>
                {message.sender === "ai" ? (
                  <Bot className="h-2.5 w-2.5 text-primary-foreground" />
                ) : (
                  <User className="h-2.5 w-2.5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className={`rounded-lg p-2 text-xs ${
                  message.sender === "ai" 
                    ? "bg-muted text-foreground" 
                    : "bg-primary text-primary-foreground"
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex space-x-2">
        <Input
          placeholder="Ask a quick question..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 text-xs h-8"
        />
        <Button 
          onClick={handleSendMessage} 
          size="sm"
          className="h-8 w-8 p-0 bg-primary hover:bg-primary/90"
        >
          <Send className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}