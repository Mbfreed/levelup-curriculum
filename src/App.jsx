import React from "react";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { CourseProvider } from "./contexts/CourseContext";
import { router } from "./router.jsx";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <CourseProvider>
        <RouterProvider router={router} />
      </CourseProvider>
    </UserProvider>
  );
}

export default App;
