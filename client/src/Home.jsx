import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus?")) {
      axios
        .delete("http://localhost:8081/delete/" + id)
        .then((res) => {
          console.log(res);
          location.reload();
          return true;
        })
        .catch((err) => console.log(err));
    } else {
      console.log("batal");
      return false;
    }
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2 className="text-center">User Management List</h2>
        <div className="d-flex justify-content-start">
          {/* <Link to="/create" className="btn btn-sm btn-success">
            Create +
          </Link> */}
          <a href="/create" className="btn btn-sm btn-success">
            Create +
          </a>
        </div>
        <div className="table-responsive mt-4">
          <table className="table table-bordered striped">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>NAME</th>
                <th>USERNAME</th>
                <th>LEVEL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr className="text-center" key={i}>
                  <td>{i + 1}</td>
                  <td>{d.nama}</td>
                  <td>{d.username}</td>
                  <td>{d.level}</td>
                  <td>
                    <a href={`/read/${d.id}`} className="btn btn-sm btn-info">
                      Read
                    </a>
                    <a href={`/edit/${d.id}`} className="btn btn-sm btn-primary mx-2">
                      Edit
                    </a>
                    <a href="#" onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger">
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
