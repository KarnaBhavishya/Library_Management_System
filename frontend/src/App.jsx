import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import StudentPage from "./pages/StudentPage";
import BookPage from "./pages/BookPage";
import LibraryPage from "./pages/LibraryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/student" element={<StudentPage />} />
      <Route path="/book" element={<BookPage />} />
      <Route path="/library" element={<LibraryPage />} />
    </Routes>
  );
}

export default App;