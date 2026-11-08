import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Files } from "./pages/Files.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Upload } from "./pages/Upload.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="files" element={<Files />} />
          <Route path="upload" element={<Upload />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
