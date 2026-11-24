import type { ReactNode } from "react";

export type EnrollmentStatus = "Active" | "Inactive" | "Pending";

export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  status: EnrollmentStatus;
  phone?: string;
  enrollmentDate: string;
}

export interface StudentFormValues {
  name: string;
  email: string;
  course: string;
  status: EnrollmentStatus;
  phone?: string;
}

export interface SummaryStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  pendingStudents: number;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export interface StudentFormProps {
  selectedStudent: Student | null;
  onSubmit: (values: StudentFormValues) => void;
  onCancel: () => void;
}

export interface SummaryCardsProps {
  stats: SummaryStats;
}
