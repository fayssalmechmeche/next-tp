"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const fetchPokemons = () => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      name: search,
      ...(selectedType && { typeId: selectedType }),
    });

    return fetch(
      `https://nestjs-pokedex-api.vercel.app/pokemons?${query}`
    ).then((res) =>
      res.json().then((data) => {
        setPokemons(data);
      })
    );
  };

  const fetchTypes = () => {
    return fetch("https://nestjs-pokedex-api.vercel.app/types").then((res) =>
      res.json().then((data) => {
        setTypes(data);
      })
    );
  };

  const handleType = (event) => {
    const typeId = event.target.value;
    setSelectedType(typeId);
    setPage(1);
    fetchPokemons();
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setPage(1);
    fetchPokemons();
  };

  const handleClick = (id) => {
    router.push(`/pokedex/${id}`);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleLimit = (event) => {
    const newLimit = parseInt(event.target.value, 50);
    setLimit(newLimit);
    setPage(1);
    fetchPokemons();
  };

  useEffect(() => {
    fetchPokemons();
  }, [page, selectedType, search, limit]);

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Pokedex</h1>
      <div className="mb-4">
        <label htmlFor="search" className="block font-medium mb-2">
          Rechercher par nom :
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Cherchez un Pokémon"
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="filter" className="block font-medium mb-2">
          Filtrer par type :
        </label>
        <select
          id="filter"
          value={selectedType}
          onChange={handleType}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        >
          <option value="">Tous les types</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="limit" className="block font-medium mb-2">
          Nombre de Pokémon par page :
        </label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimit}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        >
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer"
            onClick={() => handleClick(pokemon.id)}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-xl text-black text-center">{pokemon.name}</h2>
            <p className="text-center text-gray-500">ID : {pokemon.id}</p>
            <div className="flex justify-center mt-4 space-x-2">
              {pokemon.types.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center space-x-2 bg-black p-2 rounded-md"
                >
                  <img src={type.image} alt={type.name} className="w-6 h-6" />
                  <span className="text-sm font-medium">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-black text-white"
              : "bg-black text-white hover:bg-black"
          }`}
        >
          Page précédente
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-black"
        >
          Page suivante
        </button>
      </div>
    </div>
  );
}
