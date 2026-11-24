import { useEffect, useState } from "react";
import type { StudentListProps } from "../types/student";
import StudentCard from "./StudentCard";

function StudentList({
  students,
  onEdit,
  onDelete
}: StudentListProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const studentsPerPage = 6;
  const totalPages = Math.ceil(students.length / studentsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [students]);

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex = (safePage - 1) * studentsPerPage;

  const currentStudents = students.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  return (
    <section className="student-section">
      <h2>Student Records ({students.length})</h2>

      {students.length === 0 ? (
        <div className="empty-state">
          <h3>No Students Found</h3>
          <p>Try changing your search or filter settings.</p>
        </div>
      ) : (
        <>
          <div className="student-grid">
            {currentStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </button>

            <span>Page {safePage} of {totalPages}</span>

            <button
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default StudentList;
