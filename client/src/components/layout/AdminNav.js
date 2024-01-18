import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/create-person" className="nav-link">Create</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
