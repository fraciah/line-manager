# 👩‍💼 Line Manager 👨‍💼

A web based application designed to help an organization manage their departments, employees, and tasks efficiently. It provides different functionalities based on user roles (managers and employees) to streamline task assignment and tracking.

### Features
1. Sign up and Login.
2. Create and manage departments/groups.
3. Add and manage employees within these groups.
4. Assign tasks to employees.
5. Create tasks. Under development:(edit and delete tasks).
6. Under development: Move employees between departments.
7. Under development: Remove employees from the organization.
8. Under development: Mark tasks as done or in progress.
9. Under development: Passsword Reset.

### Technologies Used
1. React 
2. Firebase
3. CSS(SCSS)
4. [JSON Placeholder API](https://jsonplaceholder.typicode.com/)

### Installation
1. Clone the repository:

    git clone https://github.com/fraciah/line-manager.git
    cd line-manager

2. Install dependencies:
    - Install npm packages

        npm install

3. Connect to firebase:
    - Go to [Firebase Console](https://firebase.google.com/).
    - Set up authentication:
        - Create a project.
        - Navigate to Authentication under the build dropdown.
        - Enable Email/Password Sign-in Method

    - Set up the database:
        - Navigate to Firestore Database under the build dropdown.
        - Create a database.
        - Go to the project settings and create an app by clicking on the web platform.
        - Copy the firebase configuration to your .env file as in this [example](https://github.com/fraciah/line-manager/blob/main/env.example)

    - Edit database rules to secure read/write access for authenticated users:
        - Change `allow read, write: if false;` to `allow read, write: if request.auth != null`

4. Start the development server:
    npm run dev


### First-Time Usage
1. Admin.
    - Sign up.
    - Navigate to your firestore, find your user details and change isAdmin to true and role to "Admin". Remove your user details from the employees collection.
    - Go back to the app and navigate to users to see a list of fetched fake users data from the [JSON Placeholder API](https://jsonplaceholder.typicode.com/). 
    - Log out then log in again.
    - You can now change a user to a manager. 

2. Managers
    - Perform managerial tasks with a manager account.
    - Fake users default password : "password123".

3. Employees
    - View allocated tasks
    - Fake users default password : "password123".