export default function Maintenance() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "sans-serif",
      background: "#0f172a",
      color: "white",
      textAlign: "center"
    }}>
      <h1 style={{fontSize:"42px", marginBottom:"10px"}}>
        🚧 Website Under Maintenance
      </h1>

      <p style={{fontSize:"18px", opacity:0.8}}>
        We are currently updating our website.  
        Please check back shortly.
      </p>
    </div>
  );
}