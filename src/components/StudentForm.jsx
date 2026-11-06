function StudentForm({
  id,
  setId,
  name,
  setName,
  email,
  setEmail,
  course,
  setCourse,
  fieldErrors,
  clearFieldError,
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  patchStudent,
  deleteStudent,
  clearForm,
  loading,
  loadingAction,
  message,
  error,
}) {
  return (
    <div className="form-container">
      <h2>Student Details</h2>

      <input
        type="number"
        placeholder="Student ID (for GET, PUT, PATCH, DELETE)"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        className={fieldErrors.name ? "input-error" : ""}
        onChange={(e) => {
          setName(e.target.value);
          clearFieldError("name");
        }}
      />

      {fieldErrors.name && (
        <small className="field-error">{fieldErrors.name}</small>
      )}

      <input
        type="email"
        placeholder="Student Email"
        value={email}
        className={fieldErrors.email ? "input-error" : ""}
        onChange={(e) => {
          setEmail(e.target.value);
          clearFieldError("email");
        }}
      />

      {fieldErrors.email && (
        <small className="field-error">{fieldErrors.email}</small>
      )}

      <input
        type="text"
        placeholder="Student Course"
        value={course}
        className={fieldErrors.course ? "input-error" : ""}
        onChange={(e) => {
          setCourse(e.target.value);
          clearFieldError("course");
        }}
      />

      {fieldErrors.course && (
        <small className="field-error">{fieldErrors.course}</small>
      )}

      <div className="button-container">
        <button
          className="get"
          onClick={() => getStudents()}
          disabled={loading}
        >
          {loadingAction === "GET_ALL" ? "Loading..." : "GET All"}
        </button>

        <button className="get" onClick={getStudentById} disabled={loading}>
          {loadingAction === "GET_BY_ID" ? "Loading..." : "GET By ID"}
        </button>

        <button className="post" onClick={addStudent} disabled={loading}>
          {loadingAction === "POST" ? "Adding..." : "POST"}
        </button>

        <button className="put" onClick={updateStudent} disabled={loading}>
          {loadingAction === "PUT" ? "Updating..." : "PUT"}
        </button>

        <button className="patch" onClick={patchStudent} disabled={loading}>
          {loadingAction === "PATCH" ? "Updating..." : "PATCH"}
        </button>

        <button className="delete" onClick={deleteStudent} disabled={loading}>
          {loadingAction === "DELETE" ? "Deleting..." : "DELETE"}
        </button>

        <button className="clear" onClick={clearForm} disabled={loading}>
          CLEAR
        </button>
      </div>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default StudentForm;
