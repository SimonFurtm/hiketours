import React from "react";
import "../css/footer.css";
import colors from "../css/Colors";


export default function Footer() {
  return (
    <footer style={{ backgroundColor: colors.secondary, color: colors.primary }}>
      <p>
        HTL Saalfelden, Simon Furtmüller, Matthias Eisl, Alexander Lux - {new Date().getDate()}-{new Date().getMonth() + 1}-{new Date().getFullYear()}
      </p>
    </footer>
  );
}
