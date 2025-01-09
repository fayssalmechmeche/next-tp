"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Pokemon({ params }) {
  const { id } = params;
  const router = useRouter();

  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    stats: {
      HP: "",
      attack: "",
      defense: "",
      specialAttack: "",
      specialDefense: "",
      speed: "",
    },
    evolutions: [],
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(
          `https://nestjs-pokedex-api.vercel.app/pokemons/${id}`
        );
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();
  }, [id]);

  const goBack = () => {
    router.push("/pokedex");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 max-w-md mx-auto">
        <button
          onClick={goBack}
          className="mb-6 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Retour à la liste
        </button>

        <div className="text-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-40 h-40 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">{pokemon.name}</h1>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">
          Statistiques
        </h2>
        <ul className="mt-4 space-y-2">
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">HP :</span>
            <span className="text-black">{pokemon.stats.HP}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">Attack :</span>
            <span className="text-black">{pokemon.stats.attack}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">Defense :</span>
            <span className="text-black">{pokemon.stats.defense}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">Special Attack :</span>
            <span className="text-black">{pokemon.stats.specialAttack}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">Special Defense :</span>
            <span className="text-black">{pokemon.stats.specialDefense}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-600">Speed :</span>
            <span className="text-black">{pokemon.stats.speed}</span>
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">Évolutions</h2>

        <ul className="mt-4">
          {pokemon.evolutions.map((evolution) => (
            <li key={evolution.pokedexId} className="flex items-center">
              <span className="font-medium text-gray-700">
                {evolution.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
