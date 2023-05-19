import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtFzyo9kDG35kf4EvoL-F7MYmu7hnpcIo",
  authDomain: "awesomeproject-848ac.firebaseapp.com",
  projectId: "awesomeproject-848ac",
  storageBucket: "awesomeproject-848ac.appspot.com",
  messagingSenderId: "62431917255",
  appId: "1:62431917255:web:3f50861fed19319c9a7ae2",
  // measurementId: "G-K8GTKQNM5B",
};

export default firebase.initializeApp(firebaseConfig);

// import firebase from "firebase/app";
// import "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBtFzyo9kDG35kf4EvoL-F7MYmu7hnpcIo",
//   authDomain: "awesomeproject-848ac.firebaseapp.com",
//   projectId: "awesomeproject-848ac",
//   storageBucket: "awesomeproject-848ac.appspot.com",
//   messagingSenderId: "62431917255",
//   appId: "1:62431917255:web:3f50861fed19319c9a7ae2",
// };

// firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics();
