// import React, { useEffect, useState } from "react";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "./firebase";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// function UserMonitor({ userId }) {
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();


//   useEffect(() => {
//     if (!userId) return;
  
//     const userDocRef = doc(db, "fieldUsers", userId);
  
//     const unsubscribe = onSnapshot(
//       userDocRef,
//       (docSnapshot) => {
//         if (docSnapshot.exists()) {
//           console.log("User info:", docSnapshot.data());
//           setUserData(docSnapshot.data());
//         } else {
//           console.log("User document deleted. Logging out.");
//           Swal.fire(
//             "Logout",
//             "Your account has been deleted / Suspended by Administrator",
//             "error"
//           ).then(() => {
//             localStorage.clear();
//             navigate("/login");
//           });
//         }
//       },
//       (error) => {
//         console.error("Error monitoring user document:", error);
//       }
//     );
  
//     return () => unsubscribe();
//   }, [userId]);
  

//   return (
//     <>
//       {/* You can render your user data here */}
//       {userData ? (
//         <div>Welcome, {userData.name}</div>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </>
//   );
// }

// export default UserMonitor;

// import React, { useEffect, useState } from "react";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "./firebase";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// function UserMonitor() {
//   const navigate = useNavigate(); // ✅ Now correctly inside Router
//   const [userData, setUserData] = useState(null);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!userId) return;
//     console.log("UserIDDDDDDDDD", userId);
//     const userDocRef = doc(db, "fieldUsers", userId);
//     const unsubscribe = onSnapshot(
//       userDocRef,
//       (docSnapshot) => {
//         if (docSnapshot.exists()) {
//           setUserData(docSnapshot.data());
//         } else {
//           Swal.fire(
//             "Logout",
//             "Your account has been deleted / Suspended by Administrator",
//             "error"
//           ).then(() => {
//             localStorage.clear();
//             navigate("/login"); // ✅ Now works because it's inside Router
//           });
//         }
//       },
//       (error) => {
//         console.error("Error monitoring user document:", error);
//       }
//     );

//     return () => unsubscribe();
//   }, [userId, navigate]);

// //   return <>{userData ? <div>Welcome, {userData.name}</div> : <p>Loading...</p>}</>;
// }

// export default UserMonitor;


import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function UserMonitor() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const userDocRef = doc(db, "fieldUsers", userId);

    // First, fetch user data synchronously before setting up the real-time listener
    const fetchUserData = async () => {
        if(!userData){
            try {
                const docSnapshot = await getDoc(userDocRef);
                if (docSnapshot.exists()) {
                console.log("User info:", docSnapshot.data());
        
                  setUserData(docSnapshot.data());
                } else {
                  Swal.fire(
                    "Logout",
                    "Your account has been deleted / Suspended by Administrator",
                    "error"
                  ).then(() => {
                    localStorage.clear();
                    navigate("/login");
                  });
                }
              } catch (error) {
                console.error("Error fetching user data:", error);
              }
        }
   
    };

    fetchUserData(); // Await initial fetch

    // Then, set up the real-time listener
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
        } else {
          Swal.fire(
            "Logout",
            "Your account has been deleted / Suspended by Administrator",
            "error"
          ).then(() => {
            localStorage.clear();
            navigate("/login");
          });
        }
      },
      (error) => {
        console.error("Error monitoring user document:", error);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return (
    <div>
      {/* {userData ? (
        <p>Welcome, {userData.name}</p>
      ) : (
        <p>Loading user data...</p>
      )} */}
    </div>
  );
}

export default UserMonitor;
