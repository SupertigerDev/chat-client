import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

export default function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}


function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}



function Register() {
  return (
    <div>
      <h2>Register</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
