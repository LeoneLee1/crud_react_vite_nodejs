import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/login", { username, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="d-flex justify-content-center">
          <h3>Login</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Username
            </label>
            <input type="text" placeholder="john.it" className="form-control" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Password
            </label>
            <input type="password" placeholder="**********" className="form-control" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
