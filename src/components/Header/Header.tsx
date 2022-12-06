import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, User } from "../index";

export const Header: React.FC = () => {
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
                  color: 'black' 
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
                  color: 'black' 
                }}
              >
                User
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};
