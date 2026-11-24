import type { StudentCardProps } from "../types/student";

function StudentCard({
  student,
  onEdit,
  onDelete
}: StudentCardProps) {
  return (
    <div className="student-card">
      <div className="student-top">
        <div className="avatar">
          {student.name.charAt(0).toUpperCase()}
        </div>

        <span className={`status ${student.status.toLowerCase()}`}>
          {student.status}
        </span>
      </div>

      <h3>{student.name}</h3>
      <p className="student-email">{student.email}</p>

      <div className="student-info">
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Phone:</strong> {student.phone || "Not provided"}</p>
        <p><strong>Enrolled:</strong> {student.enrollmentDate}</p>
      </div>

      <div className="student-actions">
        <button className="edit-btn" onClick={() => onEdit(student)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(student.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
