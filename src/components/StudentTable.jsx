function StudentTable({
  students,
  currentStudents,
  sortedStudents,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  studentsPerPage,
  setStudentsPerPage,
  exportToCSV,
  loading,
  selectStudent,
  currentPage,
  setCurrentPage,
  totalPages,
  isAdmin,
}) {
  return (
    <div className="table-container">
      <h2>Student Records</h2>

      <input
        type="text"
        placeholder="Search by ID, name, email or course"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="id">Student ID</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="course">Course</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => {
          setSortOrder(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <select
        value={studentsPerPage}
        onChange={(e) => {
          setStudentsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value={5}>5 Students</option>
        <option value={10}>10 Students</option>
        <option value={20}>20 Students</option>
      </select>

      <button
        className="get"
        onClick={exportToCSV}
        disabled={loading || sortedStudents.length === 0}
      >
        Export CSV
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5">No students found</td>
            </tr>
          ) : (
            currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  {isAdmin && (
                    <button
                      className="edit"
                      onClick={() => selectStudent(student)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentTable;
