export interface Character {
    id: number;
    name: string;
    status: string;
    gender: string;
    image: string;
}

export const fetchCharacters = async (filters: { status?: string; gender?: string; page?: number } = {}) => {
    const query = new URLSearchParams(
        Object.entries(filters)
          .filter(([_, value]) => value !== undefined)
          .reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
      ).toString();
    
    const response = await fetch(`https://rickandmortyapi.com/api/character?${query}`);
    if (!response.ok) {
        throw new Error("Failed to fetch characters");
    }
    return response.json();
};
