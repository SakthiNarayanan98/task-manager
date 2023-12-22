import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



export const environment = {
    production: false,
    firebase: {
      apiKey: "AIzaSyCWvZyDsT37Vx8ZwdCNYYKtU1AI-WX9-aQ",
      authDomain: "task-manager-e46f2.firebaseapp.com",
      databaseURL: "https://task-manager-e46f2-default-rtdb.firebaseio.com/",
      projectId: "task-manager-e46f2",
      storageBucket: "task-manager-e46f2.appspot.com",
      messagingSenderId: "955590753556",
      appId: "1:955590753556:web:ca1932aca989e55b265601",
      measurementId: "G-SS4MLCHG9L"
    }
  };


  // Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);