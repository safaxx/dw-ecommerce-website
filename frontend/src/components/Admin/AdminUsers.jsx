import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../layout/Loader";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/user/admin/all-users")
      .then(({ data }) => setUsers(data.users))
      .catch((requestError) =>
        setError(requestError.response?.data?.message || requestError.message),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="admin-page">
      <p className="admin-eyebrow">Customers</p>
      <h2>Users</h2>

      {loading && <Loader />}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`admin-role-pill admin-role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && users.length === 0 && <p>No users yet.</p>}
    </section>
  );
};

export default AdminUsers;
