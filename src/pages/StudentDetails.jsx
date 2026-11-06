import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API, request } from "../services/studentService";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudent() {
      try {
        setLoading(true);
        setError("");

        const response = await request(`${API}/${id}`);
        setStudent(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [id]);

  if (loading) {
    return <h2 className="details-message">Loading student details...</h2>;
  }

  if (error) {
    return <h2 className="details-message">Error: {error}</h2>;
  }

  if (!student) {
    return <h2 className="details-message">Student not found.</h2>;
  }

  return (
    <div className="student-details-page">
      <h1>Student Details</h1>

      <div className="student-details-content">
        <div className="student-details-card">
          <div className="details-card-header">
            <h2>{student.name}</h2>
            <span>Student ID: {student.id}</span>
          </div>

          <div className="details-info">
            <div className="details-info-item">
              <span>Name</span>
              <strong>{student.name}</strong>
            </div>

            <div className="details-info-item">
              <span>Email Address</span>
              <strong>{student.email}</strong>
            </div>

            <div className="details-info-item">
              <span>Course</span>
              <strong>{student.course}</strong>
            </div>
          </div>

          <button
            className="details-back-button"
            onClick={() => navigate("/students")}
          >
            ← Back to Students
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
