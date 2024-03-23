import React, { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
function CharacterDetail({ selectedId, onAddFavorit, isAddetToFav }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    async function fetchDate() {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${selectedId}`
      );

      setCharacter(data);
      const episodesId = data.episode.map((e) => e.split("/").at(-1));
      const { data: episodeData } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodesId}`
      );

      setEpisodes([episodeData].flat().slice(0, 6));
    }

    if (selectedId) fetchDate();
  }, [selectedId]);

  if (!character || !selectedId)
    return (
      <div
        style={{
          color: "white",
          display:"none"
        }}
      >
        Please select a character
      </div>
    );
  return (
    <div>
      <CharacterSunInfo
        isAddetToFav={isAddetToFav}
        character={character}
        onAddFavorit={onAddFavorit}
      />
      <Episode episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function CharacterSunInfo({ character, isAddetToFav, onAddFavorit }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span> {character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp; {character.status}</span>
          <span>- {character.species}</span>
        </div>
        <div className="location">
          <p>Last Known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddetToFav ? (
            <p>
              Already Added To Favorit
              {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "16px", marginLeft: "7px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="green"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                  />
                </svg>
              }
            </p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavorit(character)}
            >
              Add to favorit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
function Episode({ episodes }) {
  const [sortBy, setSortby] = useState(true);
  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={() => setSortby((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} {item.episode}:{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
