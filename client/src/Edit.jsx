import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) => {
        console.log(res);
        setValues({ ...values, nama: res.data[0].nama, username: res.data[0].username, level: res.data[0].level });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const [values, setValues] = useState({
    nama: "",
    username: "",
    password: "",
    level: "",
  });

  const handelUpdate = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8081/update/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handelUpdate}>
          <h2 className="text-center">Edit User</h2>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input type="text" className="form-control" value={values.nama} onChange={(e) => setValues({ ...values, nama: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={values.username} onChange={(e) => setValues({ ...values, username: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="text" className="form-control" placeholder="*********" onChange={(e) => setValues({ ...values, password: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Level</label>
            <select className="form-control" onChange={(e) => setValues({ ...values, level: e.target.value })}>
              <option value={values.level} selected disabled>
                {values.level}
              </option>
              <option value="" disabled>
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

export default Edit;
