import type {
  Student,
  EnrollmentStatus
} from "../types/student";

export function getItemById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  return items.find((item) => item.id === id);
}

export function searchStudents(
  students: Student[],
  search: string
): Student[] {
  const value = search.toLowerCase().trim();

  if (!value) return students;

  return students.filter(
    (student) =>
      student.name.toLowerCase().includes(value) ||
      student.email.toLowerCase().includes(value)
  );
}

export function filterStudents(
  students: Student[],
  course: string,
  status: EnrollmentStatus | "All"
): Student[] {
  return students.filter((student) => {
    const courseMatch =
      course === "All" || student.course === course;

    const statusMatch =
      status === "All" || student.status === status;

    return courseMatch && statusMatch;
  });
}

export function sortRecords<T>(
  records: T[],
  key: keyof T,
  direction: "asc" | "desc"
): T[] {
  return [...records].sort((a, b) => {
    const first = String(a[key]).toLowerCase();
    const second = String(b[key]).toLowerCase();

    const result = first.localeCompare(second);

    return direction === "asc" ? result : -result;
  });
}

export function generateStudentId(): string {
  return crypto.randomUUID();
}

export function isStudentArray(value: unknown): value is Student[] {
  if (!Array.isArray(value)) return false;

  return value.every((item: unknown) => {
    if (typeof item !== "object" || item === null) return false;

    const student = item as Record<string, unknown>;

    return (
      typeof student.id === "string" &&
      typeof student.name === "string" &&
      typeof student.email === "string" &&
      typeof student.course === "string" &&
      (student.status === "Active" ||
        student.status === "Inactive" ||
        student.status === "Pending") &&
      (student.phone === undefined ||
        typeof student.phone === "string") &&
      typeof student.enrollmentDate === "string"
    );
  });
}
