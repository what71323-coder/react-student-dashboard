import { useEffect, useState } from "react";
import type {
  ChangeEvent,
  FormEvent
} from "react";

import type {
  StudentFormProps,
  StudentFormValues,
  EnrollmentStatus
} from "../types/student";

const emptyForm: StudentFormValues = {
  name: "",
  email: "",
  course: "",
  status: "Active",
  phone: ""
};

function StudentForm({
  selectedStudent,
  onSubmit,
  onCancel
}: StudentFormProps) {
  const [formData, setFormData] =
    useState<StudentFormValues>(emptyForm);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        email: selectedStudent.email,
        course: selectedStudent.course,
        status: selectedStudent.status,
        phone: selectedStudent.phone || ""
      });
    } else {
      setFormData(emptyForm);
    }

    setError("");
  }, [selectedStudent]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setFormData((previous) => ({ ...previous, name: value }));
        break;
      case "email":
        setFormData((previous) => ({ ...previous, email: value }));
        break;
      case "course":
        setFormData((previous) => ({ ...previous, course: value }));
        break;
      case "phone":
        setFormData((previous) => ({ ...previous, phone: value }));
        break;
      case "status":
        if (
          value === "Active" ||
          value === "Inactive" ||
          value === "Pending"
        ) {
          const status: EnrollmentStatus = value;
          setFormData((previous) => ({ ...previous, status }));
        }
        break;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.course.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
      phone: formData.phone?.trim()
    });

    setFormData(emptyForm);
    setError("");
  }

  return (
    <div className="form-card">
      <h2>{selectedStudent ? "Edit Student" : "Add New Student"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student-name">Full Name *</label>
          <input
            id="student-name"
            type="text"
            name="name"
            placeholder="Enter student name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="student-email">Email Address *</label>
          <input
            id="student-email"
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="student-course">Course *</label>
          <select
            id="student-course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="React Development">React Development</option>
            <option value="Web Development">Web Development</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="student-phone">Phone Number</label>
          <input
            id="student-phone"
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="student-status">Enrollment Status</label>
          <select
            id="student-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {selectedStudent ? "Update Student" : "Add Student"}
          </button>

          {selectedStudent && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
