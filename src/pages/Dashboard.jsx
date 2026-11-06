function Dashboard(props) {
  const totalCourses = new Set(props.students.map((student) => student.course))
    .size;

  const courseSummary = props.students.reduce((summary, student) => {
    summary[student.course] = (summary[student.course] || 0) + 1;
    return summary;
  }, {});

  const averageStudentsPerCourse =
    totalCourses > 0 ? (props.students.length / totalCourses).toFixed(1) : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Student Management System</h1>
          <p>Overview of your students and courses</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="stat-icon student-icon">S</div>
          <div>
            <h3>Total Students</h3>
            <h2>{props.students.length}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="stat-icon course-icon">C</div>
          <div>
            <h3>Total Courses</h3>
            <h2>{totalCourses}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="stat-icon average-icon">A</div>
          <div>
            <h3>Average Students</h3>
            <h2>{averageStudentsPerCourse}</h2>
          </div>
        </div>
      </div>

      <div className="course-summary">
        <h3>Students by Course</h3>

        {Object.keys(courseSummary).length === 0 ? (
          <p className="no-course-data">No student records available yet.</p>
        ) : (
          <div className="course-list">
            {Object.entries(courseSummary).map(([course, count]) => {
              const percentage = (
                (count / props.students.length) *
                100
              ).toFixed(1);

              return (
                <div className="course-item" key={course}>
                  <div className="course-item-header">
                    <span>{course}</span>
                    <strong>
                      {count} students ({percentage}%)
                    </strong>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
