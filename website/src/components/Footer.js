import React from "react";
import "../css/footer.css";

export default function Footer() {
  return (
    <footer>
      <p>
        HTL Saalfelden, Simon Furtmüller, Matthias Eisl, Alexander Lux - {new Date().getDay()}-{new Date().getMonth()}-{new Date().getFullYear()}
      </p>
    </footer>
  );
}
