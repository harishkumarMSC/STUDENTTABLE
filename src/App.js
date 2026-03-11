import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import "./styles.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStudents([]);
      setLoading(false);
    }, 1000);
  }, []);
  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const updateStudent = (student) => {
    setStudents(students.map((s) => (s.id === student.id ? student : s)));
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>STUDENT MANAGEMENT</h2>

      <StudentForm
        addStudent={addStudent}
        editingStudent={editingStudent}
        updateStudent={updateStudent}
      />

      <StudentTable
        students={students}
        loading={loading}
        setEditingStudent={setEditingStudent}
        deleteStudent={deleteStudent}
      />
    </div>
  );
}
