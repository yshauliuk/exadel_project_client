import axios from "axios";
import React, { useContext, useState } from "react";
import { TokenContext } from "../../contexts/TokenContext";

type userObject = {
  email: string;
  fullName: string;
  dateOfCreation: string;
  birthday: string;
  photos: [Object];
};

export const User: React.FC = () => {
  const [user, setUser] = useState<userObject | null>(null);

  const token = useContext(TokenContext);

  const getUserData = async () => {
    const user = await axios.get("http://localhost:8000/user/get-data", {
      headers: { authorization: token },
    });
    setUser(user.data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target as HTMLFormElement);
    const dataObject = Object.fromEntries(formData);

    await axios
      .post("http://localhost:8000/user/update-data", dataObject, {
        headers: {
          authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data));

    getUserData();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <button onClick={getUserData}>Show personal information</button>
      {user ? (
        <form
          action="post"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "400px",
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            disabled
            defaultValue={user.email}
          />
          <label htmlFor="dateOfCreation" style={{ marginTop: "5px" }}>
            Date of register
          </label>
          <input
            type="text"
            name="dateOfCreation"
            id="dateOfCreation"
            defaultValue={new Date(
              Date.parse(user.dateOfCreation)
            ).toLocaleString()}
            disabled
          />
          <label htmlFor="fullName" style={{ marginTop: "5px" }}>
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            defaultValue={user.fullName}
          />
          <label htmlFor="birthday" style={{ marginTop: "5px" }}>
            Birthday
          </label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            defaultValue={user.birthday?.slice(0, 10)}
          />
          <label htmlFor="photos" style={{ marginTop: "5px" }}>
            Photos
          </label>
          <div style={{ marginBottom: "5px" }}>
            {user.photos.map((value: any) => ( //?
              <a
                key={value._id}
                href={`http://localhost:8000/${user.email}/${value.name}`}
                target="_blank"
              >
                <img
                  src={`http://localhost:8000/${user.email}/${value.name}`}
                  alt="photo"
                  height="100"
                  style={{ padding: "0.2px" }}
                />
              </a>
            ))}
          </div>
          <input type="file" name="photos" id="photos" multiple />
          <button type="submit" style={{ marginTop: "10px" }}>
            Update
          </button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
