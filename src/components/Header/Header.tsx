import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, User, Events } from "../index";
import { useContext } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import { userObject } from "../User/User";
import jwt_decode from "jwt-decode";

export const Header: React.FC = () => {
  const token = useContext(TokenContext);
  const decoded: userObject = jwt_decode(token);

  return (
    <BrowserRouter>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <nav>
          <ul
            style={{
              width: "200px",
              margin: 0,
              padding: 0,
              display: "flex",
              justifyContent: "space-around",
              listStyleType: "none",
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/user"
                style={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                User
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                style={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Events
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home fullName={decoded.fullName} />} />
        <Route path="/user" element={<User />} />
        <Route
          path="/events"
          element={<Events isAdmin={decoded.isAdmin} userId={decoded.id} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
