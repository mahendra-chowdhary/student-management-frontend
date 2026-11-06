function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1>About Student Management System</h1>

        <p className="about-description">
          The Student Management System is a full-stack web application
          developed to simplify and organize student record management. It
          provides a user-friendly interface for managing student information
          with secure authentication and role-based access.
        </p>

        <h3>Project Overview</h3>
        <p>
          This application allows administrators to manage student records,
          while regular users can securely view student information. It
          integrates a React frontend with a Spring Boot backend and a MySQL
          database.
        </p>

        <h3>Key Features</h3>
        <div className="technology-list">
          <p>Student registration and record management</p>
          <p>View, update, and delete student information</p>
          <p>Search, sorting, and pagination</p>
          <p>JWT-based authentication and authorization</p>
          <p>Role-based access control (Admin and User)</p>
          <p>Input validation and exception handling</p>
          <p>REST API integration and Swagger documentation</p>
        </div>

        <h3>Technologies Used</h3>
        <div className="technology-list">
          <p>
            <strong>Frontend:</strong> React.js, JavaScript, HTML, CSS
          </p>
          <p>
            <strong>Backend:</strong> Java, Spring Boot
          </p>
          <p>
            <strong>Security:</strong> Spring Security, JWT, BCrypt
          </p>
          <p>
            <strong>Database:</strong> MySQL
          </p>
          <p>
            <strong>API:</strong> REST API, Swagger / OpenAPI
          </p>
          <p>
            <strong>Build Tool:</strong> Maven
          </p>
          <p>
            <strong>Development Tools:</strong> Eclipse, VS Code, Postman
          </p>
          <p>
            <strong>Version Control:</strong> Git, GitHub
          </p>
        </div>

        <h3>Project Objective</h3>
        <p>
          The main objective of this project is to build a secure and
          maintainable full-stack application while applying practical knowledge
          of Java, Spring Boot, React.js, database management, REST APIs, and
          web application security.
        </p>
      </div>
    </div>
  );
}

export default About;
