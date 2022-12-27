import axios from "axios";
import { useState, useContext } from "react";
import { TokenContext } from "../../../contexts/TokenContext";

type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateEventModal: React.FC<props> = ({ closeModal }) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const token = useContext(TokenContext);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target as HTMLFormElement);
    const dataObject = Object.fromEntries(formData);

    await axios
      .post("http://localhost:8000/event/create-event", dataObject, {
        headers: { authorization: token },
      })
      .then((res) => alert(res.data))
      .catch((err) => console.log(err.message));
      
    closeModal(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: "rgba(77, 77, 77, .7)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          position: "relative",
          borderRadius: "5px",
        }}
      >
        <h1 style={{ margin: "0 0 20px 0", textAlign: "center" }}>
          Create new event
        </h1>
        <button
          onClick={() => closeModal(false)}
          style={{ position: "absolute", right: "2px", top: "2px" }}
        >
          X
        </button>

        <form
          action="post"
          style={{
            fontSize: "20px",
            width: "400px",
          }}
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="name"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            Name:
            <input type="text" name="name" required />
          </label>
          <label
            htmlFor="description"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            Description:
            <textarea name="description" rows={2} required />
          </label>
          <label
            htmlFor="start_date"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            Start date:
            <input type="date" name="start_date" required />
          </label>
          <label
            htmlFor="online"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            Online:
            <div>
              Yes
              <input
                onClick={() => setIsOnline(false)}
                type="radio"
                name="online"
                value="yes"
                required
              />
              No
              <input
                onClick={() => setIsOnline(true)}
                type="radio"
                name="online"
                value="no"
                required
              />
            </div>
          </label>
          <label
            htmlFor="addres"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            Address
            <input type="text" name="address" required disabled={!isOnline} />
          </label>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button type="submit">Create</button>
            <button onClick={() => closeModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
