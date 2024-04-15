import { Route, Routes } from "react-router-dom";
import { Login, SignUp } from "./pages";
import Home from "./pages/Home";
import EditExperience from "./pages/EditExperience";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/edit-experience/:id" element={<EditExperience />} />
      </Routes>
    </div>
  );
}

export default App;