import "./App.css";
import React, { useEffect } from "react";
import Navbar, { Favorit, Search, SerachResult } from "./Component/Navbar";
import CharacterList from "./Component/CharacterList";
import CharacterDetail from "./Component/CharacterDetail";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorit, setFavorit] =useState(()=>JSON.parse(localStorage.getItem("FAV"))||[]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchDate() {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );

        setCharacters(data.results.slice(0, 5));
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      }
    }
    fetchDate();
    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);
useEffect(()=>{
  localStorage.setItem("FAV",JSON.stringify(favorit));
},[favorit])
  const onSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handeAddFav = (char) => {
    setFavorit((prev) => [...prev, char]);
  };
  const handleDeleteFav = (id) => {
    setFavorit((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };
  const isAddetToFav = favorit.map((fav) => fav.id).includes(selectedId);
  return (
    <div className="app">
      <div style={{ color: "white" }}>{count}</div>

      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SerachResult numOfResult={characters.length} />
        <Favorit favorit={favorit} onDeleteFav={handleDeleteFav} />
      </Navbar>
      <Main characters={characters}>
        <CharacterList
          characters={characters}
          onSelectCharacter={onSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorit={handeAddFav}
          isAddetToFav={isAddetToFav}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
