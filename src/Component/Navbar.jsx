import React, { Children, useState } from "react";
import "../index.css";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { Character } from "./CharacterList";
function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}
export default Navbar;

function Logo() {
  return <div className="navbar__logo">logo</div>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      className="text-field"
      placeholder="search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
export function SerachResult({ numOfResult }) {
  return <div className="navbar__result">found {numOfResult} characters</div>;
}
export function Favorit({ favorit, onDeleteFav }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List Of Favorit">
        {favorit.map((item) => (
          <Character
            item={item}
            onSelectCharacter={() => {}}
            selectedId="1"
            key={item.id}
          >
            <button className="icon red">
              <TrashIcon onClick={() => onDeleteFav(item.id)} />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorit.length}</span>
      </button>
    </>
  );
}
