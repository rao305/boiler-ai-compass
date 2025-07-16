import { StatCard } from "@/components/StatCard";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  TrendingUp, 
  Clock,
  FileText,
  MessageCircle,
  AlertCircle
} from "lucide-react";

const currentCourses = [
  {
    id: "1",
    code: "CS 251",
    title: "Data Structures and Algorithms",
    credits: 4,
    description: "Introduction to data structures and algorithms",
    instructor: "Dr. Sarah Johnson",
    rating: 4.2,
    enrollment: 180,
    capacity: 200,
    schedule: "MWF 10:30-11:20",
    semester: "Fall 2024",
    department: "Computer Science"
  },
  {
    id: "2",
    code: "MATH 266",
    title: "Ordinary Differential Equations",
    credits: 3,
    description: "Methods for solving differential equations",
    instructor: "Dr. Michael Chen",
    rating: 4.0,
    enrollment: 150,
    capacity: 180,
    schedule: "TR 1:30-2:45",
    semester: "Fall 2024",
    department: "Mathematics"
  },
  {
    id: "3",
    code: "ENGL 420",
    title: "Business Writing",
    credits: 3,
    description: "Professional communication and writing skills",
    instructor: "Prof. Lisa Brown",
    rating: 4.5,
    enrollment: 25,
    capacity: 30,
    schedule: "MW 2:30-3:45",
    semester: "Fall 2024",
    department: "English"
  }
];

const upcomingDeadlines = [
  { task: "CS 251 Assignment 3", due: "Tomorrow", type: "assignment" },
  { task: "MATH 266 Midterm Exam", due: "Oct 25", type: "exam" },
  { task: "ENGL 420 Research Paper", due: "Oct 30", type: "paper" },
  { task: "Spring 2025 Registration", due: "Nov 5", type: "registration" }
];

const degreeProgress = [
  { category: "Core CS Courses", completed: 8, total: 12, percentage: 67 },
  { category: "Mathematics", completed: 5, total: 6, percentage: 83 },
  { category: "General Education", completed: 12, total: 15, percentage: 80 },
  { category: "Technical Electives", completed: 2, total: 6, percentage: 33 },
  { category: "Free Electives", completed: 3, total: 6, percentage: 50 }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
          <div className="mt-2 flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Computer Science • Junior • GPA: 3.67</span>
            <span>95 Credits Completed</span>
            <span>Expected Graduation: May 2026</span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Current Courses"
            value="3"
            subtitle="10 credit hours"
            icon={BookOpen}
          />
          <StatCard
            title="Degree Progress"
            value="74%"
            subtitle="Expected graduation May 2026"
            icon={GraduationCap}
          />
          <StatCard
            title="Remaining Credits"
            value="33"
            subtitle="11 courses to go"
            icon={Calendar}
          />
          <StatCard
            title="Current GPA"
            value="3.67"
            icon={TrendingUp}
            trend={{ value: 2.1, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Current Courses</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Assistant Widget */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="rounded-md bg-primary p-2">
                  <MessageCircle className="h-4 w-4 text-primary-foreground" />
                </div>
                <h3 className="font-medium text-foreground">AI Assistant</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Need help with course planning or have questions about requirements?
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Ask AI Assistant
              </Button>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="p-6">
              <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Upcoming Deadlines</span>
              </h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{deadline.task}</p>
                      <p className="text-xs text-muted-foreground capitalize">{deadline.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{deadline.due}</p>
                      {deadline.due === "Tomorrow" && (
                        <AlertCircle className="h-4 w-4 text-yellow-500 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Degree Progress */}
            <Card className="p-6">
              <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>Degree Progress</span>
              </h3>
              <div className="space-y-4">
                {degreeProgress.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {category.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {category.completed}/{category.total}
                      </span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-medium text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Transcript
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Plan Next Semester
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explore Courses
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}