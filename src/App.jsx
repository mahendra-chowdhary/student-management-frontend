import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import {
  login as loginUser,
  logout as logoutUser,
} from "./services/authService";
import React, { useEffect, useState } from "react";
import "./App.css";
import { API, request } from "./services/studentService";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Navigation from "./components/Navigation";
import StudentDetails from "./pages/StudentDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  // State variables
  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  function clearFieldError(field) {
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // LOGIN
  async function handleLogin(username, password) {
    const loggedInUser = await loginUser(username, password);

    setUser(loggedInUser);
    setMessage("Login successful!");
    setError("");

    navigate("/");
  }

  // LOGOUT
  function handleLogout() {
    logoutUser();
    setUser(null);
    setStudents([]);
    clearForm();
    navigate("/login");
  }

  // GET ALL STUDENTS
  // showMessage controls whether the GET success message is displayed
  async function getStudents(showMessage = true) {
    if (showMessage) {
      setLoading(true);
      setLoadingAction("GET_ALL");
    }
    try {
      setError("");
      const response = await request(API);
      setStudents(response.data);
      if (showMessage) {
        setMessage("Students fetched successfully!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      if (showMessage) {
        await delay(1000);
        setLoading(false);
        setLoadingAction("");
      }
    }
  }

  // GET STUDENT BY ID
  async function getStudentById() {
    if (!id) {
      setError("Please enter Student ID");
      setMessage("");
      return;
    }
    try {
      setLoading(true);
      setLoadingAction("GET_BY_ID");
      setError("");
      setMessage("");

      const response = await request(`${API}/${id}`);

      navigate(`/students/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      await delay(1000);
      setLoading(false);
      setLoadingAction("");
    }
  }

  // POST - ADD STUDENT
  async function addStudent() {
    setFieldErrors({});
    try {
      setLoading(true);
      setLoadingAction("POST");
      setError("");
      setMessage("");

      const response = await request(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, course }),
      });

      clearForm();

      // Refresh table without displaying GET success message
      await getStudents(false);

      setMessage(response.message);
    } catch (err) {
      setFieldErrors(err.fieldErrors || {});
      setError(err.message);
      setMessage("");
    } finally {
      await delay(1000);
      setLoading(false);
      setLoadingAction("");
    }
  }

  // PUT - UPDATE COMPLETE STUDENT DETAILS
  async function updateStudent() {
    if (!id) {
      setError("Please enter Student ID for PUT");
      setMessage("");
      return;
    }
    setFieldErrors({});
    try {
      setLoading(true);
      setLoadingAction("PUT");
      setError("");
      setMessage("");

      const response = await request(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          course,
        }),
      });

      // Refresh table without changing the operation message
      await getStudents(false);

      setMessage(response.message);
    } catch (err) {
      setFieldErrors(err.fieldErrors || {});
      setError(err.message);
      setMessage("");
    } finally {
      await delay(1000);
      setLoading(false);
      setLoadingAction("");
    }
  }

  // PATCH - UPDATE SELECTED STUDENT FIELDS
  async function patchStudent() {
    if (!id) {
      setError("Please enter Student ID");
      setMessage("");
      return;
    }

    const updates = {};

    if (name !== "") {
      updates.name = name;
    }

    if (email !== "") {
      updates.email = email;
    }

    if (course !== "") {
      updates.course = course;
    }

    if (Object.keys(updates).length === 0) {
      setError("Enter at least one field to update");
      setMessage("");
      return;
    }
    setFieldErrors({});
    setError("");
    setMessage("");
    try {
      setLoading(true);
      setLoadingAction("PATCH");
      setError("");
      setMessage("");

      const response = await request(`${API}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      await getStudents(false);

      setMessage(response.message);
    } catch (err) {
      setFieldErrors(err.fieldErrors || {});
      setError(err.message);
      setMessage("");
    } finally {
      await delay(1000);
      setLoading(false);
      setLoadingAction("");
    }
  }

  // DELETE STUDENT
  async function deleteStudent() {
    if (!id) {
      setError("Please enter Student ID");
      setMessage("");
      return;
    }
    // Ask for deletion confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );
    // Stop if the user selects Cancel
    if (!confirmDelete) {
      return;
    }
    try {
      setLoading(true);
      setLoadingAction("DELETE");
      setError("");
      setMessage("");

      await request(`${API}/${id}`, {
        method: "DELETE",
      });

      clearForm();

      await getStudents(false);

      setMessage("Student deleted successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      await delay(1000);
      setLoading(false);
      setLoadingAction("");
    }
  }

  // CLEAR FORM
  function clearForm() {
    setId("");
    setName("");
    setEmail("");
    setCourse("");
    setMessage("");
    setError("");
    setFieldErrors({});
  }

  // SELECT STUDENT FOR EDITING
  function selectStudent(student) {
    setId(String(student.id));
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);

    setMessage("Student selected for editing");
    setError("");
  }

  // Fetch students when component loads
  useEffect(() => {
    if (user) {
      getStudents();
    } else {
      setStudents([]);
    }
  }, [user]);

  const filteredStudents = students.filter((student) =>
    [student.id, student.name, student.email, student.course].some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase()),
    ),
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];

    if (sortBy === "id") {
      valueA = Number(valueA);
      valueB = Number(valueB);
    } else {
      valueA = String(valueA ?? "").toLowerCase();
      valueB = String(valueB ?? "").toLowerCase();
    }

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }

    return 0;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;

  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  function exportToCSV() {
    const headers = ["Student ID", "Name", "Email", "Course"];

    const rows = sortedStudents.map((student) => [
      student.id,
      student.name,
      student.email,
      student.course,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "students.csv";

    link.click();

    URL.revokeObjectURL(url);
  }
  return (
    <>
      <Navigation user={user} onLogout={handleLogout} />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            user ? <Dashboard students={students} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/students"
          element={
            user ? (
              <Students
                id={id}
                setId={setId}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                course={course}
                setCourse={setCourse}
                fieldErrors={fieldErrors}
                clearFieldError={clearFieldError}
                getStudents={getStudents}
                getStudentById={getStudentById}
                addStudent={addStudent}
                updateStudent={updateStudent}
                patchStudent={patchStudent}
                deleteStudent={deleteStudent}
                clearForm={clearForm}
                loading={loading}
                loadingAction={loadingAction}
                message={message}
                error={error}
                students={students}
                currentStudents={currentStudents}
                sortedStudents={sortedStudents}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                studentsPerPage={studentsPerPage}
                setStudentsPerPage={setStudentsPerPage}
                exportToCSV={exportToCSV}
                selectStudent={selectStudent}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                user={user}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/students/:id"
          element={user ? <StudentDetails /> : <Navigate to="/login" />}
        />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
