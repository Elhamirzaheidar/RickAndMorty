import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { Children } from "react";

function CharacterList({ characters, onSelectCharacter, selectedId }) {
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item}>
          <button
            className="icon red "
            onClick={() => onSelectCharacter(item.id)}
          >
            {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}

export default CharacterList;

export function Character({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <Info item={item} />
      {children}
    </div>
  );
}

function CharacterName({ item }) {
  return <h3 className="name">{item.name}</h3>;
}
function Info({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
}
