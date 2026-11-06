import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

function Students(props) {
  return (
    <div className="container">
      <h1>Student Management System</h1>
      {props.user?.role === "ADMIN" && (
        <StudentForm
          id={props.id}
          setId={props.setId}
          name={props.name}
          setName={props.setName}
          email={props.email}
          setEmail={props.setEmail}
          course={props.course}
          setCourse={props.setCourse}
          fieldErrors={props.fieldErrors}
          clearFieldError={props.clearFieldError}
          getStudents={props.getStudents}
          getStudentById={props.getStudentById}
          addStudent={props.addStudent}
          updateStudent={props.updateStudent}
          patchStudent={props.patchStudent}
          deleteStudent={props.deleteStudent}
          clearForm={props.clearForm}
          loading={props.loading}
          loadingAction={props.loadingAction}
          message={props.message}
          error={props.error}
        />
      )}

      <StudentTable
        students={props.students}
        currentStudents={props.currentStudents}
        sortedStudents={props.sortedStudents}
        searchTerm={props.searchTerm}
        setSearchTerm={props.setSearchTerm}
        sortBy={props.sortBy}
        setSortBy={props.setSortBy}
        sortOrder={props.sortOrder}
        setSortOrder={props.setSortOrder}
        studentsPerPage={props.studentsPerPage}
        setStudentsPerPage={props.setStudentsPerPage}
        exportToCSV={props.exportToCSV}
        loading={props.loading}
        selectStudent={props.selectStudent}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
        totalPages={props.totalPages}
        isAdmin={props.user?.role === "ADMIN"}
      />
    </div>
  );
}

export default Students;
