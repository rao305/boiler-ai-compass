import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Users, 
  Calendar,
  ChevronDown 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allCourses = [
  {
    id: "1",
    code: "CS 180",
    title: "Problem Solving and Object-Oriented Programming",
    credits: 3,
    description: "Problem solving and algorithms using object-oriented design and implementation",
    instructor: "Dr. Sarah Johnson",
    rating: 4.2,
    enrollment: 180,
    capacity: 200,
    schedule: "MWF 10:30-11:20",
    semester: "Spring 2025",
    department: "Computer Science",
    prerequisites: ["MATH 159"]
  },
  {
    id: "2",
    code: "CS 251",
    title: "Data Structures and Algorithms",
    credits: 4,
    description: "Introduction to data structures, algorithms, and their complexity analysis",
    instructor: "Dr. Michael Chen",
    rating: 4.0,
    enrollment: 150,
    capacity: 180,
    schedule: "TR 1:30-2:45",
    semester: "Spring 2025",
    department: "Computer Science",
    prerequisites: ["CS 180", "MATH 165"]
  },
  {
    id: "3",
    code: "CS 252",
    title: "Systems Programming",
    credits: 4,
    description: "Introduction to systems programming concepts including memory management",
    instructor: "Prof. Lisa Brown",
    rating: 4.5,
    enrollment: 95,
    capacity: 120,
    schedule: "MWF 2:30-3:20",
    semester: "Spring 2025",
    department: "Computer Science",
    prerequisites: ["CS 251"]
  },
  {
    id: "4",
    code: "MATH 266",
    title: "Ordinary Differential Equations",
    credits: 3,
    description: "Methods for solving first and higher order differential equations",
    instructor: "Dr. Robert Wilson",
    rating: 3.8,
    enrollment: 140,
    capacity: 160,
    schedule: "TR 11:30-12:45",
    semester: "Spring 2025",
    department: "Mathematics",
    prerequisites: ["MATH 165"]
  },
  {
    id: "5",
    code: "CS 348",
    title: "Information Systems",
    credits: 3,
    description: "Database design, implementation, and management systems",
    instructor: "Dr. Jennifer Lee",
    rating: 4.3,
    enrollment: 80,
    capacity: 100,
    schedule: "MW 4:30-5:45",
    semester: "Spring 2025",
    department: "Computer Science",
    prerequisites: ["CS 251", "CS 252"]
  },
  {
    id: "6",
    code: "ENGL 420",
    title: "Business Writing",
    credits: 3,
    description: "Professional communication and writing skills for technical careers",
    instructor: "Prof. Amanda Davis",
    rating: 4.6,
    enrollment: 25,
    capacity: 30,
    schedule: "TR 2:30-3:45",
    semester: "Spring 2025",
    department: "English"
  }
];

export default function CourseExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCredits, setSelectedCredits] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  const departments = ["Computer Science", "Mathematics", "English", "Physics", "Chemistry"];
  const creditOptions = ["1", "2", "3", "4", "5+"];
  const levelOptions = ["100-level", "200-level", "300-level", "400-level"];

  const handleAddToPlan = (courseId: string) => {
    // Placeholder for add to plan functionality
    console.log("Added course to plan:", courseId);
  };

  const filteredStats = {
    total: filteredCourses.length,
    cs: filteredCourses.filter(c => c.department === "Computer Science").length,
    spring: filteredCourses.filter(c => c.semester === "Spring 2025").length
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Course Explorer</h1>
          <p className="mt-2 text-muted-foreground">
            Discover and plan your academic journey with comprehensive course information
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Courses"
            value={filteredStats.total}
            subtitle="Available this semester"
            icon={BookOpen}
          />
          <StatCard
            title="CS Courses"
            value={filteredStats.cs}
            subtitle="Computer Science offerings"
            icon={Users}
          />
          <StatCard
            title="Spring 2025"
            value={filteredStats.spring}
            subtitle="Next semester courses"
            icon={Calendar}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </h2>
              
              <div className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Search Courses
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Course code or title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Department Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Department
                  </label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="All departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Credits Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Credit Hours
                  </label>
                  <Select value={selectedCredits} onValueChange={setSelectedCredits}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any credits" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any credits</SelectItem>
                      {creditOptions.map((credits) => (
                        <SelectItem key={credits} value={credits}>{credits}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Course Level
                  </label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All levels</SelectItem>
                      {levelOptions.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDepartment("");
                    setSelectedCredits("");
                    setSelectedLevel("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Course Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Showing {filteredCourses.length} courses
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Spring 2025</Badge>
                  <Badge variant="outline">Available</Badge>
                </div>
              </div>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="enrollment">Availability</SelectItem>
                  <SelectItem value="code">Course Code</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onAddToPlan={handleAddToPlan}
                />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <Card className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms to find courses.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}