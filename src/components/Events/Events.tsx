import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { CreateEventModal } from "../index";
import { TokenContext } from "../../contexts/TokenContext";

type props = {
  isAdmin: boolean;
  userId: string;
};

type eventObject = {
  _id: string;
  name: string;
  description: string;
  start_date: string;
  is_online: boolean;
  address: string;
  participants: [Object];
};

export const Events: React.FC<props> = ({ isAdmin, userId }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [events, setEvents] = useState<Array<eventObject>>([]);

  const token = useContext(TokenContext);
  console.log(events);

  const getAllEvents = async () => {
    await axios
      .get("http://localhost:8000/event/get-all-events", {
        headers: { authorization: token },
      })
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const getUpcomingEvents = async () => {
    await axios
      .get("http://localhost:8000/event/get-upcoming-events", {
        headers: { authorization: token },
      })
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const registerForEventHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLFormElement;
    const eventId = target.name;

    await axios
      .post(
        "http://localhost:8000/event/register-for-event",
        { userId: userId, eventId: eventId },
        {
          headers: { authorization: token },
        }
      )
      .catch((err) => console.log(err.message));

    getUpcomingEvents();
  };

  const cancelEventRegistration = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLFormElement;
    const eventId = target.name;
    await axios
      .post(
        "http://localhost:8000/event/cancel-registration",
        { userId: userId, eventId: eventId },
        { headers: { authorization: token } }
      )
      .catch((err) => console.log(err.message));

    getUpcomingEvents();
  };

  const deleteEventHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLFormElement;

    if (confirm("Are you sure?")) {
      await axios
        .delete("http://localhost:8000/event/delete-event", {
          headers: { authorization: token, data: target.name },
        })
        .catch((err) => console.log(err.message));
    }
    getAllEvents();
  };

  useEffect(() => {
    isAdmin ? getAllEvents() : getUpcomingEvents();
  }, [openModal]);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "24px",
          marginBottom: "25px",
          borderBottom: "1px solid black",
        }}
      >
        <span style={{ flex: "0 1 20%" }}>Name</span>
        <span style={{ flex: "0 1 20%" }}>Start date</span>
        <span style={{ flex: "0 1 20%" }}>Online event</span>
        <span style={{ flex: "0 1 20%" }}>Address</span>
        <span style={{ flex: "0 1 20%" }}>Description</span>
        <span style={{ flex: "0 1 20%" }}>Management</span>
      </div>
      {events &&
        events.map((item: eventObject) => (
          <div
            style={{
              display: "flex",
              marginBottom: "25px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={item._id}
          >
            <span style={{ flex: "0 1 20%" }}>{item.name}</span>
            <span style={{ flex: "0 1 20%" }}>
              {item.start_date.slice(0, 10)}
            </span>
            <span style={{ flex: "0 1 20%" }}>
              {item.is_online ? "yes" : "no"}
            </span>
            <span style={{ flex: "0 1 20%" }}>{item.address ?? "-"}</span>
            <span style={{ flex: "0 1 20%" }}>{item.description}</span>
            <span style={{ flex: "0 1 20%", maxHeight: "20px" }}>
              {isAdmin ? (
                <button
                  name={item._id}
                  style={{ width: "100px" }}
                  onClick={deleteEventHandler}
                >
                  Delete event
                </button>
              ) : item.participants.includes(userId) ? (
                <button
                  name={item._id}
                  style={{ width: "100px" }}
                  onClick={cancelEventRegistration}
                >
                  Cancel
                </button>
              ) : (
                <button
                  name={item._id}
                  style={{ width: "100px" }}
                  onClick={registerForEventHandler}
                >
                  Register for event
                </button>
              )}
            </span>
          </div>
        ))}
      {isAdmin && (
        <button onClick={() => setOpenModal(true)}>Create new event</button>
      )}
      {isAdmin && openModal && <CreateEventModal closeModal={setOpenModal} />}
    </div>
  );
};
