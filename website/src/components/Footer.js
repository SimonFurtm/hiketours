import React from "react";

export default function Footer() {
  return (
    <footer>
      <p>
        HTL Saalfelden, Simon Furtmüller, Matthias Eisl, Alexander Lux - {new Date().getDay()}-{new Date().getMonth()}-{new Date().getFullYear()}
      </p>
    </footer>
  );
}
