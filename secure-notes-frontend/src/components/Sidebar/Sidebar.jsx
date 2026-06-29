import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">Secure Notes</h2>

      <ul>

        <li className="active">
          Dashboard
        </li>

        <li>
          Profile
        </li>

        <li>
          Logout
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;