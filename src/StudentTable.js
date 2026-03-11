import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function StudentTable({
  students,
  loading,
  setEditingStudent,
  deleteStudent,
}) {
  const downloadExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, sheet, "Students");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([buffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "students.xlsx");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="table-container">
      <div className="table-header">
        <button className="download-btn" onClick={downloadExcel}>
          Download Excel
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="name-cell">{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>

              <td>
                <div className="action-box">
                  <button
                    className="edit-btn"
                    onClick={() => setEditingStudent(s)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm("Delete student?"))
                        deleteStudent(s.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
