type props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateEventModal: React.FC<props> = ({ closeModal }) => {
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
            <input type="text" name="name" />
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
            <textarea name="description" rows={2} />
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
            <input type="date" name="start_date" />
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
              <input type="radio" name="online" value="yes" checked />
              No
              <input type="radio" name="online" value="no" />
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
            <input type="text" name="address" />
          </label>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button type="submit">Create</button>
            <button type="reset" onClick={() => closeModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
