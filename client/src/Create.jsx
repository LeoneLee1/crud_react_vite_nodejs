import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    nama: "",
    username: "",
    password: "",
    level: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/insert", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Add User</h2>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input type="text" placeholder="Nama Lengkap" className="form-control" onChange={(e) => setValues({ ...values, nama: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" placeholder="Username" className="form-control" onChange={(e) => setValues({ ...values, username: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="text" placeholder="*********" className="form-control" onChange={(e) => setValues({ ...values, password: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Level</label>
            <select className="form-control" onChange={(e) => setValues({ ...values, level: e.target.value })}>
              <option value="" selected disabled>
                Pilih Level
              </option>
              <option value="1">1</option>
              <option value="0">0</option>
            </select>
          </div>
          <button type="submit" className="btn btn-sm btn-primary mx-2">
            Simpan
          </button>
          <a href="/" className="btn btn-sm btn-warning">
            Cancel
          </a>
        </form>
      </div>
    </div>
  );
}

export default Create;
