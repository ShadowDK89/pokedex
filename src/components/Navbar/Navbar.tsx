import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { currentGeneration } from "../../redux/reducers/pokeminListReducer";
import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const dispatch = useAppDispatch();
  let navHtml: JSX.Element[] = [];

  for (let i = 0; i <= 8; i++) {
    let temp = renderNav(i);
    navHtml.push(temp);
  }

  function updateGen(generation: number) {
    dispatch(currentGeneration(generation));
  }

  function renderNav(i: number) {
    return (
      <li key={`gen-${i}`} id={i === 0 ? "show-all" : ""}>
        <Link
          to="/"
          onClick={() => {
            updateGen(i);
          }}
        >
          <button>{i === 0 ? "Show all" : `Gen ${i}`}</button>
        </Link>
      </li>
    );
  }

  return (
    <div id="nav-links">
      <ul>{navHtml}</ul>
    </div>
  );
}

export default Navbar;
