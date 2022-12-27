import { useState } from "react";
import { CreateEventModal } from "../index";

type props = {
  isAdmin: boolean;
};

export const Events: React.FC<props> = ({ isAdmin }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      {isAdmin ? (
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setOpenModal(true)}>Create new event</button>
          {openModal && <CreateEventModal closeModal={setOpenModal} />}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
