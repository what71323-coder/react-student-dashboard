import StudentList from "../components/StudentList";
import type { StudentListProps } from "../types/student";

function StudentRecordsPage(props: StudentListProps) {
  return <StudentList {...props} />;
}

export default StudentRecordsPage;