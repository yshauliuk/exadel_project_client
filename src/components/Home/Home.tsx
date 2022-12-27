type props = {
  fullName: string;
};

export const Home: React.FC<props> = ({ fullName }) => {
  return (
    <div style={{ textAlign: "center", fontSize: "30px" }}>
      Hello {fullName ? fullName : "User"}
    </div>
  );
};
