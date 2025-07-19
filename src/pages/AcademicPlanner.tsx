import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Plus, 
  Search, 
  Download, 
  Save,
  Clock,
  BookOpen,
  Trash2
} from "lucide-react";

interface PlannedCourse {
  id: string;
  code: string;
  title: string;
  credits: number;
  semester: string;
}

const semesters = [
  { id: "fall2024", name: "Fall 2024", season: "Fall", year: 2024, current: true },
  { id: "spring2025", name: "Spring 2025", season: "Spring", year: 2025, current: false },
  { id: "fall2025", name: "Fall 2025", season: "Fall", year: 2025, current: false },
  { id: "spring2026", name: "Spring 2026", season: "Spring", year: 2026, current: false },
  { id: "fall2026", name: "Fall 2026", season: "Fall", year: 2026, current: false },
  { id: "spring2027", name: "Spring 2027", season: "Spring", year: 2027, current: false },
];

const availableCourses = [
  { id: "cs180", code: "CS 180", title: "Problem Solving and OOP", credits: 3 },
  { id: "cs251", code: "CS 251", title: "Data Structures", credits: 4 },
  { id: "cs252", code: "CS 252", title: "Systems Programming", credits: 4 },
  { id: "cs348", code: "CS 348", title: "Information Systems", credits: 3 },
  { id: "math266", code: "MATH 266", title: "Differential Equations", credits: 3 },
  { id: "engl420", code: "ENGL 420", title: "Business Writing", credits: 3 },
];

export default function AcademicPlanner() {
  const [plannedCourses, setPlannedCourses] = useState<{ [semesterId: string]: PlannedCourse[] }>({
    fall2024: [
      { id: "cs251", code: "CS 251", title: "Data Structures", credits: 4, semester: "fall2024" },
      { id: "math266", code: "MATH 266", title: "Differential Equations", credits: 3, semester: "fall2024" },
      { id: "engl420", code: "ENGL 420", title: "Business Writing", credits: 3, semester: "fall2024" }
    ],
    spring2025: [
      { id: "cs252", code: "CS 252", title: "Systems Programming", credits: 4, semester: "spring2025" },
      { id: "cs348", code: "CS 348", title: "Information Systems", credits: 3, semester: "spring2025" }
    ]
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [draggedCourse, setDraggedCourse] = useState<any>(null);

  const getTotalCredits = (semesterId: string) => {
    return plannedCourses[semesterId]?.reduce((total, course) => total + course.credits, 0) || 0;
  };

  const getTotalCreditsAllSemesters = () => {
    return Object.values(plannedCourses).flat().reduce((total, course) => total + course.credits, 0);
  };

  const handleDragStart = (course: any) => {
    setDraggedCourse(course);
  };

  const handleDrop = (semesterId: string) => {
    if (draggedCourse) {
      const newPlannedCourse: PlannedCourse = {
        ...draggedCourse,
        semester: semesterId
      };

      setPlannedCourses(prev => ({
        ...prev,
        [semesterId]: [...(prev[semesterId] || []), newPlannedCourse]
      }));
      setDraggedCourse(null);
    }
  };

  const removeCourse = (semesterId: string, courseId: string) => {
    setPlannedCourses(prev => ({
      ...prev,
      [semesterId]: prev[semesterId]?.filter(course => course.id !== courseId) || []
    }));
  };

  const filteredCourses = availableCourses.filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Academic Planner</h1>
          <p className="mt-2 text-muted-foreground">
            Plan your semester-by-semester course schedule for graduation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Search Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Available Courses</span>
              </h2>
              
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-20"
                  />
                  <Button 
                    size="sm" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8"
                    onClick={() => {
                      // Search functionality handled by filteredCourses
                      console.log("Searching for:", searchTerm);
                    }}
                  >
                    Search
                  </Button>
                </div>
                
                {/* Autocomplete suggestions */}
                {searchTerm && (
                  <div className="mt-2 max-h-32 overflow-y-auto border border-border rounded-md bg-background">
                    {availableCourses
                      .filter(course =>
                        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        course.title.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((course) => (
                        <button
                          key={course.id}
                          className="w-full text-left px-3 py-2 hover:bg-accent text-sm border-b border-border last:border-b-0"
                          onClick={() => {
                            setSearchTerm(course.code);
                          }}
                        >
                          <span className="font-medium">{course.code}</span> - {course.title}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Course List */}
              <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    draggable
                    onDragStart={() => handleDragStart(course)}
                    className="p-3 border border-border rounded-lg cursor-move transition-refined hover-lift bg-card"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{course.code}</p>
                        <p className="text-sm text-muted-foreground">{course.title}</p>
                      </div>
                      <Badge variant="secondary">{course.credits}</Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Planning Summary */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-foreground mb-3">Planning Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Credits:</span>
                    <span className="font-medium text-foreground">{getTotalCreditsAllSemesters()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining:</span>
                    <span className="font-medium text-foreground">{120 - getTotalCreditsAllSemesters()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Grad:</span>
                    <span className="font-medium text-foreground">Spring 2027</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Plan
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // Save plan to local storage for degree audit
                    localStorage.setItem('academicPlan', JSON.stringify(plannedCourses));
                    // Navigate to degree audit
                    window.location.href = '/audit';
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Submit to Degree Audit
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Plan
                </Button>
              </div>
            </Card>
          </div>

          {/* Semester Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {semesters.map((semester) => (
                <Card key={semester.id} className={`p-6 ${semester.current ? 'ring-2 ring-primary' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold text-foreground">{semester.name}</h3>
                      {semester.current && (
                        <Badge variant="default">Current</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {getTotalCredits(semester.id)} credits
                      </span>
                    </div>
                  </div>

                  {/* Drop Zone */}
                  <div
                    className={`min-h-32 border-2 border-dashed border-border rounded-lg p-4 transition-colors ${
                      draggedCourse ? 'border-primary bg-primary/5' : ''
                    }`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(semester.id)}
                  >
                    {plannedCourses[semester.id]?.length > 0 ? (
                      <div className="space-y-3">
                        {plannedCourses[semester.id].map((course) => (
                          <div key={course.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                            <div>
                              <p className="font-medium text-foreground">{course.code}</p>
                              <p className="text-sm text-muted-foreground">{course.title}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">{course.credits}</Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCourse(semester.id, course.id)}
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Drag courses here</p>
                      </div>
                    )}
                  </div>

                  {/* Credit Warning */}
                  {getTotalCredits(semester.id) > 18 && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        ⚠️ Heavy course load ({getTotalCredits(semester.id)} credits)
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}