// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, query, collection, where, getDocs, doc, setDoc, addDoc, getDoc, Timestamp, updateDoc, arrayUnion, deleteDoc  } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { deAuthenticate, getUserProfile, setAuthenticated } from "./UserDataApi";

const firebaseConfig = {
    apiKey: "AIzaSyBEBPpopN1iTcn1TjlFBRo6YFogfgIl3YQ",
    authDomain: "pgwritinghubnet.firebaseapp.com",
    projectId: "pgwritinghubnet",
    storageBucket: "pgwritinghubnet.appspot.com",
    messagingSenderId: "738782869859",
    appId: "1:738782869859:web:781ff2f5e1a14225723b56",
    measurementId: "G-MSY44TH8YJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const analytics = getAnalytics(app);


/** 
 * Function to create user with email and password 
 * @constructor
 * @param {String} username - User's username
 * @param {String} email - User's email
 * @param {String} password - User's password
 * @param {String} role - User's role
 * 
 * @returns A message if the user registration was successful or not
 * 
*/
export const SignUpUser = (username, email, password, role) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // signed in
        const user = userCredential.user
        // Add user to DB
        if(user) {
            const userProfile = {username, email, role, uid: user.uid}
            return setDoc(doc(db, 'users', user.uid), userProfile).then(() => {
                localStorage.setItem("user_profile", JSON.stringify(userProfile))
                setAuthenticated()
                return "Success: User Registered"
            })
        } else {
            return "Error: Failed to register user"
        }
    })
    .catch((error) => {
        if(error.message === "Firebase: Error (auth/email-already-in-use).") {
            return "Error: User already exists . . ."
        } else if(error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
            return "Error: Weak Password . . ."
        }
        else {
            return "Error: Network error . . ."
        }
    })
}


// Signin
export const SignInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if(user) {
            return getDoc(doc(db, 'users', user.uid)).then(userProfile => {
                if(userProfile.exists()) {
                    localStorage.setItem("user_profile", JSON.stringify(userProfile.data()))
                    setAuthenticated()
                    return "Success: User Logged in"
                } else {
                    return "Error: Contact Support to resolve account issues"
                }
            })
        } else {
            return "Error: Invalid credentials"
        }
    })
    .catch((error) => {
        if(error.message === "Firebase: Error (auth/user-not-found).") {
            return "Error: User not found . . ."
        } else if(error.message === "Firebase: Error (auth/wrong-password).") {
            return "Error: Incorrect credentials . . ."
        }
        else {
            return "Error: Network error . . ."
        }
    });
}

export const SendResetPasswordLink = (email) => {
    return sendPasswordResetEmail(auth, email).then(() => {
        return "Success: Password reset link sent"
    }).catch(error => {
        if(error.message === "Firebase: Error (auth/user-not-found).") {
            return "Error: User not found . . ."
        }
        else {
            return "Error: Network error . . ."
        }
    })
}

// Edit User Profile
export const EditUser = ( firstname, lastname, username, calendly ) => {
    let userData = getUserProfile()
    let newUserProfile = userData.role === 'tutor'? {...userData, firstname, lastname, username, calendly} : {...userData, firstname, lastname, username }
    return setDoc(doc(db, 'users', userData.uid), newUserProfile).then(() => {
        localStorage.setItem("user_profile", JSON.stringify(newUserProfile))
        return "Success: Edited User"
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}



// Accept/Reject user
export const ConfirmUserApplication = async (id, newUserData) => {
    return setDoc(doc(db, 'users', id), newUserData).then(() => {
        return "Success: Edited User"
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}

// Logout
export const LogoutUser = async () => {
    await signOut(auth)
    .then(() => {
        deAuthenticate()
    })
}

// Validate Username
export const ValidateUsername = async (param) => {
    const q = query(collection(db, 'users'), where('username', '==', param))
    const docs = await getDocs(q)
    if(docs.empty) {
        return;
    }
    return docs
}

// Validate Email
export const ValidateEmail = async (param) => {
    const q = query(collection(db, 'users'), where('email', '==', param))
    const docs = await getDocs(q)
    if(docs.empty) {
        return;
    }
    return docs
}

// Get list of user
export const GetUsers = async () => {
    let userList = []
    const q = query(collection(db, 'users'))
    const docs = await getDocs(q)
    if(docs.empty) {
        return;
    }
    docs.forEach(doc => userList.push(doc.data()))
    return userList
}

// Get list of tutors
export const GetMentors = async () => {
    let mentorList = []
    const q = query(collection(db, 'users'), where('role', '==', 'tutor'))
    const docs = await getDocs(q)
    if(docs.empty) {
        return;
    }
    docs.forEach(doc => mentorList.push(doc.data()))
    return mentorList
}

// Get list of facilitators
export const GetFacilitators = async () => {
    let FacilitatorList = []
    const q = query(collection(db, 'users'), where('role', '==', 'facilitator'))
    const docs = await getDocs(q)
    if(docs.empty){
        return;
    }
    docs.forEach(doc => FacilitatorList.push(doc.data()))
    return FacilitatorList
}

//Create New Forum
export const CreateForum = async ( form ) => {
    let userData = getUserProfile()
    const q = query(collection(db, 'forums'), where('title', '==', form.title))
    const docs = await getDocs(q)
    if(docs.empty) {
        let forumData = {...form, participants: [userData.uid], date_created: Timestamp.fromDate(new Date())}
        return addDoc(collection(db, 'forums'), forumData).then((forum) => {
            return setDoc(doc(db, 'forums_chat', forum.id), {chats: []}).then(() => {
                return "Success: Edited User"
            })
        })
        .catch((error) => {
            return `Error: Network error, refresh . . .`
        });
    }
    return "Error: Forum already exists"
}


// Delete Forum
export const DeleteForum = ( id ) => {
    return deleteDoc(doc(db, 'forums', id)).then(() => {
        return `Success: Deleted Forum}`
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}


// Get a forums
export const GetSingleForum = async (id) => {
    const q = doc(db, 'forums', id)
    const snapshot = await getDoc(q)
    if(snapshot.exists()) {
        return snapshot.data()
    }
    return;
}


// Join forums
export const JoinForum = async (id, newForumData) => {
    return setDoc(doc(db, 'forums', id), newForumData).then(() => {
        return "Success: Edited User"
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}


// Send forums Chat
export const SendForumChat = async (id, newChatData) => {
    return updateDoc(doc(db, 'forums_chat', id), {chats: arrayUnion({...newChatData, date_sent: Timestamp.fromDate(new Date())})}).then(() => {
        return "Success: Message sent"
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}

// Delete ForumChat
export const DeleteForumChat = ( id, chats ) => {
    let newChatsList = {chats}
    return setDoc(doc(db, 'forums_chat', id), newChatsList).then(() => {
        return `Success: Deleted chat}`
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}

// Get Resources categories
export const GetCategories = async () => {
    return getDocs(collection(db, 'resources')).then(docs => {
        if(docs.empty){
            return
        }
        let categories = []
        docs.forEach(doc => categories.push(doc.id))
        return categories 
    })
}

// Create Resources
export const CreateResource = async (resourceData) => {
    let newResource = {title: resourceData.title, link: resourceData.link}
    const q = doc(db, 'resources', resourceData.category.replace(" ", "_"))
    return getDoc(q).then(snapshot => {
        if(snapshot.exists()) {
            return updateDoc(q, {resources: arrayUnion(newResource)}).then(() => {
                return "Success: Resource created"
            })
            .catch((error) => {
                return `Error: Network error, refresh . . .`
            });
        } else {
            return setDoc(q, {resources: arrayUnion(newResource)}).then(() => {
                return "Success: Resource created"
            })
            .catch((error) => {
                return `Error: Network error, refresh . . .`
            });
        }
    })
}

// Edit Resource
export const EditResources = ( id, resources ) => {
    let newResources = {resources}
    return setDoc(doc(db, 'resources', id), newResources).then(() => {
        return `Success: Edited ${id.replace("_", " ")}`
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}

// Delete Category
export const DeleteCategory = ( id ) => {
    return deleteDoc(doc(db, 'resources', id)).then(() => {
        return `Success: Deleted ${id.replace("_", " ")}`
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}



// Get Assignment categories
export const GetAssignments = async () => {
    return getDocs(collection(db, 'assignments')).then(docs => {
        if(docs.empty){
            return
        }
        let assignments = []
        docs.forEach(doc => assignments.push(doc.id))
        return assignments 
    })
}


// Create Assignments
export const CreateAssignment = async (assignmentData) => {
    let newAssignment = {link: assignmentData.link, deadline: assignmentData.deadline}
    const q = doc(db, 'assignments', assignmentData.category.replace(" ", "_"))
    return getDoc(q).then(snapshot => {
        if(snapshot.exists()) {
            return updateDoc(q, {assignments: arrayUnion(newAssignment)}).then(() => {
                return "Success: Assignment created"
            })
            .catch((error) => {
                return `Error: Network error, refresh . . .`
            });
        } else {
            return setDoc(q, {assignments: arrayUnion(newAssignment)}).then(() => {
                return "Success: Assignment created"
            })
            .catch((error) => {
                return `Error: Network error, refresh . . .`
            });
        }
    })
}


// Edit Assignment
export const EditAssignment = ( id, assignments ) => {
    let newAssignment = {assignments}
    return setDoc(doc(db, 'assignments', id), newAssignment).then(() => {
        return `Success: Edited ${id.replace("_", " ")}`
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}

// Delete Assignment
export const DeleteAssignment = ( id ) => {
    return deleteDoc(doc(db, 'assignments', id)).then(() => {
        return `Success: Deleted ${id.replace("_", " ")}`
    })
    .catch((error) => {
        return `Error: Network error, refresh . . .`
    });
}
