import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Download, 
  Shield, 
  CheckCircle,
  Calendar,
  GraduationCap,
  TrendingUp
} from "lucide-react";

const transcriptData = [
  {
    semester: "Fall 2024",
    gpa: 3.75,
    credits: 14,
    courses: [
      { code: "CS 251", title: "Data Structures and Algorithms", credits: 4, grade: "A-", points: 14.8 },
      { code: "MATH 266", title: "Ordinary Differential Equations", credits: 3, grade: "B+", points: 9.9 },
      { code: "ENGL 420", title: "Business Writing", credits: 3, grade: "A", points: 12.0 },
      { code: "HIST 151", title: "World History", credits: 3, grade: "B", points: 9.0 },
      { code: "PE 116", title: "Fitness and Wellness", credits: 1, grade: "A", points: 4.0 }
    ]
  },
  {
    semester: "Spring 2024",
    gpa: 3.6,
    credits: 15,
    courses: [
      { code: "CS 240", title: "Programming in C", credits: 3, grade: "A", points: 12.0 },
      { code: "CS 250", title: "Computer Architecture", credits: 4, grade: "B", points: 12.0 },
      { code: "MATH 265", title: "Linear Algebra", credits: 3, grade: "A-", points: 11.1 },
      { code: "PHIL 110", title: "Introduction to Philosophy", credits: 3, grade: "A", points: 12.0 },
      { code: "PSYC 120", title: "Elementary Psychology", credits: 3, grade: "B", points: 9.0 }
    ]
  },
  {
    semester: "Fall 2023",
    gpa: 3.65,
    credits: 16,
    courses: [
      { code: "CS 180", title: "Problem Solving and OOP", credits: 3, grade: "A-", points: 11.1 },
      { code: "CS 182", title: "Foundations of CS", credits: 1, grade: "B+", points: 3.3 },
      { code: "MATH 166", title: "Calculus II", credits: 4, grade: "B", points: 12.0 },
      { code: "ENGL 106", title: "First-Year Composition", credits: 3, grade: "A-", points: 11.1 },
      { code: "ECON 210", title: "Microeconomics", credits: 3, grade: "B+", points: 9.9 },
      { code: "MUS 200", title: "Music Appreciation", credits: 3, grade: "A", points: 12.0 }
    ]
  },
  {
    semester: "Spring 2023",
    gpa: 3.5,
    credits: 14,
    courses: [
      { code: "MATH 159", title: "Plane Analytic Geometry", credits: 3, grade: "A", points: 12.0 },
      { code: "MATH 165", title: "Calculus I", credits: 4, grade: "B+", points: 13.2 },
      { code: "ART 101", title: "Art History", credits: 3, grade: "B+", points: 9.9 },
      { code: "CS 334", title: "Virtual Reality", credits: 3, grade: "A", points: 12.0 },
      { code: "CS 390", title: "Machine Learning", credits: 3, grade: "B+", points: 9.9 }
    ]
  }
];

const cumulativeStats = {
  totalCredits: 95,
  cumulativeGPA: 3.67,
  totalGradePoints: 348.65,
  deansListSemesters: 2,
  highestSemesterGPA: 3.75,
  lowestSemesterGPA: 3.5
};

export default function TranscriptManagement() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Transcript Management</h1>
          <p className="mt-2 text-muted-foreground">
            Upload, view, and manage your academic transcripts securely
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Transcript</span>
              </h2>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragOver 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-medium text-foreground mb-2">
                  Drop your transcript here
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  or click to browse files
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" size="sm" className="cursor-pointer">
                    Browse Files
                  </Button>
                </label>
              </div>

              {uploadedFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      {uploadedFile.name}
                    </span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Ready for processing
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>FERPA compliant storage</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX
                </div>
              </div>
            </Card>

            {/* Cumulative Statistics */}
            <Card className="p-6 mt-6">
              <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Academic Summary</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cumulative GPA:</span>
                  <span className="font-medium text-foreground">{cumulativeStats.cumulativeGPA}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Credits:</span>
                  <span className="font-medium text-foreground">{cumulativeStats.totalCredits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Dean's List:</span>
                  <span className="font-medium text-foreground">{cumulativeStats.deansListSemesters} semesters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Highest GPA:</span>
                  <span className="font-medium text-foreground">{cumulativeStats.highestSemesterGPA}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Transcript History */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Academic History</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Transcript
              </Button>
            </div>

            <div className="space-y-6">
              {transcriptData.map((semester, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold text-foreground">{semester.semester}</h3>
                      {semester.gpa >= 3.7 && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Dean's List
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Semester GPA</div>
                      <div className="text-xl font-bold text-foreground">{semester.gpa}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      {semester.credits} credit hours • {semester.courses.length} courses
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 font-medium text-muted-foreground">Course</th>
                          <th className="text-left py-2 font-medium text-muted-foreground">Title</th>
                          <th className="text-center py-2 font-medium text-muted-foreground">Credits</th>
                          <th className="text-center py-2 font-medium text-muted-foreground">Grade</th>
                          <th className="text-right py-2 font-medium text-muted-foreground">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.courses.map((course, courseIndex) => (
                          <tr key={courseIndex} className="border-b border-border/50">
                            <td className="py-3 font-medium text-foreground">{course.code}</td>
                            <td className="py-3 text-foreground">{course.title}</td>
                            <td className="py-3 text-center text-foreground">{course.credits}</td>
                            <td className="py-3 text-center">
                              <Badge className={`${getGradeColor(course.grade)} border-0`}>
                                {course.grade}
                              </Badge>
                            </td>
                            <td className="py-3 text-right text-foreground">{course.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Semester Summary
                    </div>
                    <div className="flex space-x-6 text-sm">
                      <span className="text-muted-foreground">
                        Credits: <span className="font-medium text-foreground">{semester.credits}</span>
                      </span>
                      <span className="text-muted-foreground">
                        GPA: <span className="font-medium text-foreground">{semester.gpa}</span>
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <Card className="p-6 mt-8 bg-muted/30">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-2">Privacy & Security</h3>
              <p className="text-sm text-muted-foreground">
                All transcript data is stored securely and complies with FERPA regulations. 
                Your academic records are encrypted and only accessible by you. 
                You can export or delete your data at any time.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}