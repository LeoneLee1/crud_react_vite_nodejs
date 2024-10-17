import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Read() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>User Detail</h2>
        {user.map((item, index) => (
          <div key={index}>
            <p>{item.nama}</p>
            <p>{item.username}</p>
            <p>{item.level}</p>
            <a href="/" className="btn btn-sm btn-warning mx-2">
              Back
            </a>
            <a href={`/edit/${item.id}`} className="btn btn-sm btn-primary">
              Edit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Read;
