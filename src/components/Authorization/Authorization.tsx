import axios from "axios";
import React, { useState } from "react";

export const Authorization: React.FC = () => {
  const [pushedButton, setPushedButton] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement);
    const dataObject = Object.fromEntries(formData);

    pushedButton && pushedButton === "Login"
      ? await axios
          .post("http://localhost:8000/login", dataObject)
          .then((res) => console.log(res))
          .catch((err) => console.log(err.message))
      : await axios
          .post("http://localhost:8000/register", dataObject)
          .then((res) => console.log(res))
          .catch((err) => console.log(err.message));

    target.reset();
  };

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;
    setPushedButton(target.innerHTML);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        action="post"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password" style={{ marginTop: "5px" }}>
          Password
        </label>
        <input type="password" name="password" id="password" required />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5px",
          }}
        >
          <button onClick={onClickHandler}>Login</button>
          <button onClick={onClickHandler}>Register</button>
        </div>
      </form>
    </div>
  );
};
