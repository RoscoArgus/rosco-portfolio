import { Navbar } from "../Navbar/Navbar";

export const PDF = ({ src, title }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <iframe
        src={src}
        title={title}
        style={{
          border: "5px solid white",
          borderRadius: "10px",
          width: "60%",
          minWidth: "750px",
          height: "100%",
        }}
      />
    </div>
  );
};
