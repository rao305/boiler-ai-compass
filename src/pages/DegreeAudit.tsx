import { useState, useEffect } from "react";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BookOpen,
  Calculator,
  Globe,
  Code,
  Lightbulb,
  Calendar
} from "lucide-react";

interface PlannedCourse {
  id: string;
  code: string;
  title: string;
  credits: number;
  semester: string;
}

const degreeRequirements = [
  {
    category: "Core Computer Science",
    icon: Code,
    completed: 8,
    total: 12,
    percentage: 67,
    creditHours: { completed: 32, total: 48 },
    courses: [
      { code: "CS 180", title: "Problem Solving and OOP", status: "completed", grade: "A-", credits: 3 },
      { code: "CS 182", title: "Foundations of CS", status: "completed", grade: "B+", credits: 1 },
      { code: "CS 240", title: "Programming in C", status: "completed", grade: "A", credits: 3 },
      { code: "CS 250", title: "Computer Architecture", status: "completed", grade: "B", credits: 4 },
      { code: "CS 251", title: "Data Structures", status: "in-progress", grade: null, credits: 4 },
      { code: "CS 252", title: "Systems Programming", status: "planned", grade: null, credits: 4 },
      { code: "CS 307", title: "Software Engineering", status: "not-taken", grade: null, credits: 3 },
      { code: "CS 348", title: "Information Systems", status: "not-taken", grade: null, credits: 3 },
      { code: "CS 381", title: "Analysis of Algorithms", status: "not-taken", grade: null, credits: 3 },
      { code: "CS 408", title: "Computer Graphics", status: "not-taken", grade: null, credits: 3 },
      { code: "CS 422", title: "Computer Networks", status: "not-taken", grade: null, credits: 3 },
      { code: "CS 426", title: "Computer Security", status: "not-taken", grade: null, credits: 3 }
    ]
  },
  {
    category: "Mathematics",
    icon: Calculator,
    completed: 5,
    total: 6,
    percentage: 83,
    creditHours: { completed: 15, total: 18 },
    courses: [
      { code: "MATH 159", title: "Plane Analytic Geometry", status: "completed", grade: "A", credits: 3 },
      { code: "MATH 165", title: "Calculus I", status: "completed", grade: "B+", credits: 4 },
      { code: "MATH 166", title: "Calculus II", status: "completed", grade: "B", credits: 4 },
      { code: "MATH 265", title: "Linear Algebra", status: "completed", grade: "A-", credits: 3 },
      { code: "MATH 266", title: "Differential Equations", status: "in-progress", grade: null, credits: 3 },
      { code: "STAT 350", title: "Probability and Statistics", status: "not-taken", grade: null, credits: 3 }
    ]
  },
  {
    category: "General Education",
    icon: Globe,
    completed: 12,
    total: 15,
    percentage: 80,
    creditHours: { completed: 36, total: 45 },
    courses: [
      { code: "ENGL 106", title: "First-Year Composition", status: "completed", grade: "A-", credits: 3 },
      { code: "ENGL 420", title: "Business Writing", status: "in-progress", grade: null, credits: 3 },
      { code: "HIST 151", title: "World History", status: "completed", grade: "B+", credits: 3 },
      { code: "PHIL 110", title: "Introduction to Philosophy", status: "completed", grade: "A", credits: 3 },
      { code: "PSYC 120", title: "Elementary Psychology", status: "completed", grade: "B", credits: 3 },
      { code: "ECON 210", title: "Microeconomics", status: "completed", grade: "B+", credits: 3 }
    ]
  },
  {
    category: "Technical Electives",
    icon: Lightbulb,
    completed: 2,
    total: 6,
    percentage: 33,
    creditHours: { completed: 6, total: 18 },
    courses: [
      { code: "CS 334", title: "Virtual Reality", status: "completed", grade: "A", credits: 3 },
      { code: "CS 390", title: "Machine Learning", status: "completed", grade: "B+", credits: 3 },
      { code: "CS 456", title: "Operating Systems", status: "not-taken", grade: null, credits: 3 },
      { code: "CS 473", title: "Introduction to AI", status: "not-taken", grade: null, credits: 3 },
      { code: "CS 490", title: "Deep Learning", status: "not-taken", grade: null, credits: 3 },
      { code: "CS 497", title: "Computer Vision", status: "not-taken", grade: null, credits: 3 }
    ]
  },
  {
    category: "Free Electives",
    icon: BookOpen,
    completed: 3,
    total: 6,
    percentage: 50,
    creditHours: { completed: 9, total: 18 },
    courses: [
      { code: "MUS 200", title: "Music Appreciation", status: "completed", grade: "A", credits: 3 },
      { code: "ART 101", title: "Art History", status: "completed", grade: "B+", credits: 3 },
      { code: "PE 116", title: "Fitness and Wellness", status: "completed", grade: "A", credits: 1 },
      { code: "SPAN 101", title: "Spanish I", status: "not-taken", grade: null, credits: 3 },
      { code: "BIOL 110", title: "Biology Fundamentals", status: "not-taken", grade: null, credits: 3 }
    ]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
    case "in-progress":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
    case "planned":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Planned</Badge>;
    default:
      return <Badge variant="outline">Not Taken</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "planned":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
  }
};

export default function DegreeAudit() {
  const [plannedCourses, setPlannedCourses] = useState<{ [semesterId: string]: PlannedCourse[] }>({});
  const [expectedGraduation, setExpectedGraduation] = useState("May 2026");

  // Load planned courses from Academic Planner
  useEffect(() => {
    const savedPlan = localStorage.getItem('academicPlan');
    if (savedPlan) {
      const parsedPlan = JSON.parse(savedPlan);
      setPlannedCourses(parsedPlan);
      
      // Calculate expected graduation based on planned courses
      const semesters = Object.keys(parsedPlan).filter(key => parsedPlan[key].length > 0);
      if (semesters.length > 0) {
        const lastSemester = semesters.sort().pop();
        const year = lastSemester?.includes('2027') ? '2027' : 
                    lastSemester?.includes('2026') ? '2026' : '2025';
        const season = lastSemester?.includes('spring') ? 'May' : 'December';
        setExpectedGraduation(`${season} ${year}`);
      }
    }
  }, []);

  // Update degree requirements based on planned courses
  const updateDegreeRequirements = () => {
    const plannedCoursesList = Object.values(plannedCourses).flat();
    
    return degreeRequirements.map(requirement => ({
      ...requirement,
      courses: requirement.courses.map(course => {
        const plannedCourse = plannedCoursesList.find(pc => pc.code === course.code);
        if (plannedCourse) {
          return { ...course, status: 'planned' };
        }
        return course;
      })
    }));
  };

  const updatedRequirements = updateDegreeRequirements();
  const totalCompleted = updatedRequirements.reduce((sum, req) => sum + req.completed, 0);
  const totalRequired = updatedRequirements.reduce((sum, req) => sum + req.total, 0);
  const overallProgress = Math.round((totalCompleted / totalRequired) * 100);
  
  const totalCreditsCompleted = updatedRequirements.reduce((sum, req) => sum + req.creditHours.completed, 0);
  const totalCreditsRequired = updatedRequirements.reduce((sum, req) => sum + req.creditHours.total, 0);
  const plannedCredits = Object.values(plannedCourses).flat().reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Degree Audit</h1>
          <p className="mt-2 text-muted-foreground">
            Track your progress toward your Computer Science degree
          </p>
        </div>

        {/* Overall Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Overall Progress"
            value={`${overallProgress}%`}
            subtitle="Degree completion"
            icon={GraduationCap}
          />
          <StatCard
            title="Credits Completed"
            value={totalCreditsCompleted}
            subtitle={`of ${totalCreditsRequired} required`}
            icon={BookOpen}
          />
          <StatCard
            title="Expected Graduation"
            value={expectedGraduation}
            subtitle="Based on your plan"
            icon={Calendar}
          />
          <StatCard
            title="Current GPA"
            value="3.67"
            subtitle="Cumulative"
            icon={Calculator}
          />
        </div>

        {/* Progress Overview */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Degree Progress Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {updatedRequirements.map((requirement, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full bg-muted p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <requirement.icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-2">{requirement.category}</h3>
                <div className="space-y-1">
                  <Progress value={requirement.percentage} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {requirement.completed}/{requirement.total} courses
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {requirement.creditHours.completed}/{requirement.creditHours.total} credits
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Detailed Requirements */}
        <div className="space-y-6">
          {updatedRequirements.map((requirement, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="rounded-md bg-muted p-2">
                    <requirement.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{requirement.category}</h3>
                    <p className="text-sm text-muted-foreground">
                      {requirement.completed} of {requirement.total} courses completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{requirement.percentage}%</div>
                  <div className="text-sm text-muted-foreground">
                    {requirement.creditHours.completed}/{requirement.creditHours.total} credits
                  </div>
                </div>
              </div>

              <Progress value={requirement.percentage} className="mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requirement.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(course.status)}
                      <div>
                        <p className="font-medium text-foreground">{course.code}</p>
                        <p className="text-sm text-muted-foreground">{course.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(course.status)}
                      {course.grade && (
                        <p className="text-sm font-medium text-foreground mt-1">{course.grade}</p>
                      )}
                      <p className="text-xs text-muted-foreground">{course.credits} credits</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Action Items */}
        {/* Academic Plan Summary */}
        {Object.keys(plannedCourses).length > 0 && (
          <Card className="p-6 mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Academic Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <p className="text-2xl font-bold text-primary">{plannedCredits}</p>
                <p className="text-sm text-muted-foreground">Planned Credits</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{Object.values(plannedCourses).flat().length}</p>
                <p className="text-sm text-muted-foreground">Planned Courses</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{expectedGraduation}</p>
                <p className="text-sm text-muted-foreground">Expected Graduation</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/planner'}
              className="w-full"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Update Academic Plan
            </Button>
          </Card>
        )}

        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recommended Actions</h2>
          <div className="space-y-3">
            {Object.keys(plannedCourses).length === 0 ? (
              <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Create your academic plan</p>
                  <p className="text-sm text-blue-700">Use the Academic Planner to plan your courses and submit to degree audit</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Complete STAT 350 next semester</p>
                    <p className="text-sm text-blue-700">Required for mathematics requirement completion</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-900">Plan technical electives</p>
                    <p className="text-sm text-yellow-700">Choose 4 more technical electives for degree completion</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">On track for {expectedGraduation} graduation</p>
                    <p className="text-sm text-green-700">Current plan supports expected graduation timeline</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}