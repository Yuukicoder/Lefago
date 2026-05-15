import { Routes, Route, Navigate } from "react-router-dom";
import AuthSplit from "./pages/Auth/AuthSplit";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthSplit />} />
      <Route path="/register" element={<AuthSplit />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;