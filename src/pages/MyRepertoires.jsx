import React from "react";
import { Link } from "react-router-dom";

export default function MyRepertoires() {
  return (
    <div>
      <Link to="/create-repertoire">
        <button>Create Repertoire</button>
      </Link>
    </div>
  );
}
