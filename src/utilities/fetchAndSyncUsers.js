import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { USERS_API } from "../utilities/apis";

//fetch users from the api and sync them with firebase authentication and firestore

const fetchAndSyncUsers = async () => {
    try {
        //fetch existing users from users collection
        const usersRef = collection(db, "users");
        const existingUsersSnapshot = await getDocs(usersRef);
        const existingUsers = existingUsersSnapshot.docs.map(doc => doc.data());

        //fetch users from  api
        const response = await axios.get(USERS_API);
        const apiUsers = response.data;

        for (const user of apiUsers) {
            const userExists = existingUsers.some(existingUser => existingUser.email === user.email);

            if (!userExists) {
                try {
                    //set default password for new users
                    const defaultPassword = "password123";

                    //create user in firebase auth
                    const userCredential = await createUserWithEmailAndPassword(auth, user.email, defaultPassword);
                    const authUser = userCredential.user;

                    //adding three extra fields to new user details
                    const userDocRef = doc(db, "users", authUser.uid);
                    const employeeDocRef = doc(db, "employees", authUser.uid);

                    await setDoc(userDocRef, {
                        ...user,
                        isAdmin: false,
                        role: "Employee",
                        isActive: true,
                    });

                    await setDoc(employeeDocRef, {
                        ...user,
                        isAdmin: false,
                        role: "Employee",
                        isActive: true,
                    })

                    console.log(`Added user: ${user.email}`);
                } catch (error) {
                    console.error(`Error adding user ${user.email}:`, error);
                }
            } else {
                console.log(`User already exists: ${user.email}`);
            }
        }
    } catch (error) {
        console.error("Error fetching and syncing users:", error);
    }
};

export default fetchAndSyncUsers;