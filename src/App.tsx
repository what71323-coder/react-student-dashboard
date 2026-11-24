import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

import { initialStudents } from "./data/students";

import type {
  Student,
  StudentFormValues,
  SummaryStats,
  EnrollmentStatus
} from "./types/student";

import {
  filterStudents,
  generateStudentId,
  searchStudents,
  sortRecords,
  isStudentArray
} from "./utils/studentUtils";

import {
  getStorageData,
  setStorageData
} from "./utils/storage";

import "./styles/style.css";

const STORAGE_KEY = "react_student_records";

function App() {
  const [students, setStudents] = useState<Student[]>(() =>
    getStorageData<Student[]>(
      STORAGE_KEY,
      initialStudents,
      isStudentArray
    )
  );

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [search, setSearch] = useState<string>("");
  const [courseFilter, setCourseFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] =
    useState<EnrollmentStatus | "All">("All");

  const [sortBy, setSortBy] =
    useState<"name" | "course">("name");

  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");

  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    setStorageData(STORAGE_KEY, students);
  }, [students]);

  const stats = useMemo<SummaryStats>(() => ({
    totalStudents: students.length,
    activeStudents: students.filter(
      (student) => student.status === "Active"
    ).length,
    inactiveStudents: students.filter(
      (student) => student.status === "Inactive"
    ).length,
    pendingStudents: students.filter(
      (student) => student.status === "Pending"
    ).length
  }), [students]);

  const filteredStudents = useMemo(() => {
    const searched = searchStudents(students, search);

    const filtered = filterStudents(
      searched,
      courseFilter,
      statusFilter
    );

    return sortRecords(filtered, sortBy, sortDirection);
  }, [
    students,
    search,
    courseFilter,
    statusFilter,
    sortBy,
    sortDirection
  ]);

  function handleAddStudent(values: StudentFormValues): void {
    const newStudent: Student = {
      ...values,
      id: generateStudentId(),
      enrollmentDate: new Date().toISOString().split("T")[0]
    };

    setStudents((previous) => [...previous, newStudent]);
    setShowForm(false);
    setSelectedStudent(null);
  }

  function handleEditStudent(values: StudentFormValues): void {
    if (!selectedStudent) return;

    setStudents((previous) =>
      previous.map((student) =>
        student.id === selectedStudent.id
          ? { ...student, ...values }
          : student
      )
    );

    setSelectedStudent(null);
    setShowForm(false);
  }

  function handleDeleteStudent(id: string): void {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    setStudents((previous) =>
      previous.filter((student) => student.id !== id)
    );

    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
      setShowForm(false);
    }
  }

  function handleEditClick(student: Student): void {
    setSelectedStudent(student);
    setShowForm(true);
  }

  function handleOpenForm(): void {
    setSelectedStudent(null);
    setShowForm(true);
  }

  function handleCancelForm(): void {
    setSelectedStudent(null);
    setShowForm(false);
  }

  function exportCSV(): void {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Course",
      "Status",
      "Phone",
      "Enrollment Date"
    ];

    const rows = students.map((student) =>
      [
        student.id,
        student.name,
        student.email,
        student.course,
        student.status,
        student.phone || "",
        student.enrollmentDate
      ]
        .map((value) => `"${value.replace(/"/g, '""')}"`)
        .join(",")
    );

    const csvContent = [
      headers.join(","),
      ...rows
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "student-records.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-container">
      <Header
        title="Student Management Dashboard"
        subtitle="Manage students, courses and enrollment records."
      >
        <button className="export-btn" onClick={exportCSV}>
          Export CSV
        </button>
      </Header>

      <SummaryCards stats={stats} />

      <div className="dashboard-layout">
        <main className="main-content">
          <div className="toolbar">
            <input
              type="search"
              placeholder="Search by name or email..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
            >
              <option value="All">All Courses</option>
              <option value="React Development">React Development</option>
              <option value="Web Development">Web Development</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as EnrollmentStatus | "All")
              }
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

            <select
              value={`${sortBy}-${sortDirection}`}
              onChange={(event) => {
                const [key, direction] = event.target.value.split("-");

                if (key === "name" || key === "course") {
                  setSortBy(key);
                }

                if (direction === "asc" || direction === "desc") {
                  setSortDirection(direction);
                }
              }}
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="course-asc">Course A-Z</option>
              <option value="course-desc">Course Z-A</option>
            </select>

            <button className="add-btn" onClick={handleOpenForm}>
              + Add Student
            </button>
          </div>

          <StudentList
            students={filteredStudents}
            onEdit={handleEditClick}
            onDelete={handleDeleteStudent}
          />
        </main>

        {showForm && (
          <aside className="form-sidebar">
            <StudentForm
              selectedStudent={selectedStudent}
              onSubmit={
                selectedStudent
                  ? handleEditStudent
                  : handleAddStudent
              }
              onCancel={handleCancelForm}
            />
          </aside>
        )}
      </div>

      <footer className="footer">
        <p>Student Management Dashboard | React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
