"use client";

import { useState, useEffect } from "react";
import { Character, fetchCharacters } from "@/utils/fetchCharacters";
import Image from "next/image";

const HomePage = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filters, setFilters] = useState({ status: "", gender: "" });
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [info, setInfo] = useState<{ next: string | null; prev: string | null }>({ next: null, prev: null });

    useEffect(() => {
        const loadCharacters = async () => {
            setLoading(true);
            try {
                const data = await fetchCharacters({ ...filters, page });
                setCharacters(data.results);
                setInfo(data.info);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadCharacters();
    }, [filters, page]);

    const updateFilter = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };
    const goToPage = (direction: "next" | "prev") => {
        if (direction === "next" && info.next) {
            setPage((prev) => prev + 1);
        } else if (direction === "prev" && info.prev) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className="p-4">
            <div className="header-img relative h-full w-full sm:rounded-lg overflow-hidden">
                <Image fill alt="head img" src="/rickandmorty.jpg" className="object-cover object-center" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-4 mt-4">Rick and Morty Characters</h1>
            {/* Filtreler */}
            <div className="flex justify-center gap-4 mb-6">
                <select className="border p-2" value={filters.status} onChange={(e) => updateFilter("status", e.target.value)}>
                    <option value="">All Status</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                <select className="border p-2" value={filters.gender} onChange={(e) => updateFilter("gender", e.target.value)}>
                    <option value="">All Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            {/* Karakterler */}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {characters.map((character) => (
                            <div key={character.id} className="border p-4 rounded-lg">
                                <img src={character.image} alt={character.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h2 className="text-lg font-bold">{character.name}</h2>
                                <p>Status: {character.status}</p>
                                <p>Gender: {character.gender}</p>
                            </div>
                        ))}
                    </div>
                    {/* Sayfalama */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="border px-4 py-2 rounded-lg disabled:opacity-50" onClick={() => goToPage("prev")} disabled={!info.prev}>
                            Previous
                        </button>
                        <button className="border px-4 py-2 rounded-lg disabled:opacity-50" onClick={() => goToPage("next")} disabled={!info.next}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
