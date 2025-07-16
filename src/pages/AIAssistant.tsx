import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Plus, MoreHorizontal, Edit3, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

export default function AIAssistant() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Welcome Chat",
      messages: [
        {
          id: "1",
          content: "Hello! I'm your Boiler AI assistant. I'm here to help you with course planning, degree requirements, and academic guidance. What would you like to know?",
          sender: "ai",
          timestamp: new Date()
        }
      ],
      lastMessage: new Date(),
    },
  ]);
  const [activeChat, setActiveChat] = useState<string>("1");
  const [inputMessage, setInputMessage] = useState("");

  const currentChat = chats.find(chat => chat.id === activeChat);
  const messages = currentChat?.messages || [];

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      lastMessage: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat === chatId && chats.length > 1) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      setActiveChat(remainingChats[0]?.id || "");
    }
  };

  const renameChat = (chatId: string, newTitle: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      lastMessage: new Date(),
      title: currentChat.messages.length === 0 ? inputMessage.slice(0, 30) + "..." : currentChat.title,
    };

    setChats(prev => prev.map(chat => 
      chat.id === activeChat ? updatedChat : chat
    ));
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're looking for academic guidance. Let me help you with that. Could you provide more details about your current major and academic year so I can give you more personalized recommendations?",
        sender: "ai",
        timestamp: new Date(),
      };
      
      setChats(prev => prev.map(chat => 
        chat.id === activeChat 
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      ));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-[calc(100vh-56px)]">
        {/* Chat History Sidebar */}
        <div className="w-64 border-r border-border bg-card">
          <div className="p-3 border-b border-border">
            <Button onClick={createNewChat} className="w-full justify-start" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
          <div className="overflow-y-auto h-full custom-scrollbar">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center justify-between p-3 cursor-pointer border-b border-border/50 hover:bg-muted/50 transition-refined ${
                  activeChat === chat.id ? "bg-primary/10 border-l-2 border-l-primary" : ""
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {chat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {chat.lastMessage.toLocaleDateString()}
                  </p>
                </div>
                {chats.length > 1 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          const newTitle = prompt("Enter new title:", chat.title);
                          if (newTitle) renameChat(chat.id, newTitle);
                        }}
                      >
                        <Edit3 className="h-3 w-3 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border p-4 bg-card">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-medium text-foreground">Boiler AI Academic Assistant</h1>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <Bot className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Welcome to Boiler AI</h3>
                  <p className="text-muted-foreground">
                    Start a conversation to get personalized academic guidance, course recommendations, 
                    and help with your academic planning.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "ai" && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                      )}
                      {message.sender === "user" && (
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex space-x-3 max-w-4xl mx-auto">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about your academic journey..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}