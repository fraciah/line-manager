
const HowItWorks = () => {
  return (
    <div className="how-container">
      <div className="how-content">
        <div className="how-title">Quick Guide</div>
        <div className="section">
          <div className="section-title">For Managers</div>
          <ul>
            <li>Sign up and log in to your account.</li>
            <li>Request for permission change to gain managerial access.</li>
            <li>Create different departments/groups and add employees to these groups.</li>
            <li>Assign tasks to employees within these groups.</li>
            {/* <li>Move employees from one department to another.</li> */}
            {/* <li>Remove an employee from the organization.</li> */}
            <li>Track the progress of tasks assigned to employees.</li>
          </ul>
        </div>
        
        <div className="section">
          <div className="section-title">For Employees</div>
          <ul>
            <li>Sign up and log in to your account.</li>
            <li>View the tasks assigned to you.</li>
            <li>Mark tasks as done or in progress.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;