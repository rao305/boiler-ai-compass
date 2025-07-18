import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import AIAssistant from "./pages/AIAssistant";
import Dashboard from "./pages/Dashboard";
import CourseExplorer from "./pages/CourseExplorer";
import AcademicPlanner from "./pages/AcademicPlanner";
import DegreeAudit from "./pages/DegreeAudit";
import TranscriptManagement from "./pages/TranscriptManagement";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <TopNavigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/courses" element={<CourseExplorer />} />
            <Route path="/planner" element={<AcademicPlanner />} />
            <Route path="/audit" element={<DegreeAudit />} />
            <Route path="/transcript" element={<TranscriptManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
