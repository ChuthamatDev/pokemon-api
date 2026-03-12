import { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// กำหนด Type ห้ามใช้ any เด็ดขาด
export interface PokemonData {
    name: string;
    types: string[];
    weight: number;
    abilities: string[];
}

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchPokemon = useCallback(async (endpoint: string, requiresAuth: boolean = true) => {
        setIsLoading(true);
        setError(null);
        setPokemon(null);

        try {
            const headers: Record<string, string> = {};

            // ถ้า Endpoint ไหนต้องใช้ JWT เราจะแนบไปด้วย
            if (requiresAuth) {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    navigate('/login'); // ไม่มี Token เด้งกลับทันที
                    return;
                }
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.get<PokemonData>(`http://localhost:3000${endpoint}`, { headers });
            setPokemon(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    // Token หมดอายุ หรือไม่ถูกต้อง
                    localStorage.removeItem('access_token');
                    navigate('/login');
                } else if (err.response?.status === 404) {
                    setError('Pokemon not found!'); // หาไม่เจอโชว์ Error ตามข้อกำหนด
                } else {
                    setError(err.response?.data?.message || 'Failed to fetch data');
                }
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    // ฟังก์ชันสำหรับค้นหาชื่อ และ ฟังก์ชันสุ่ม
    const searchPokemon = (name: string) => fetchPokemon(`/pokemon/${name.toLowerCase()}`, true);
    const getRandomPokemon = () => fetchPokemon('/pokemon/random', false);

    return { pokemon, isLoading, error, searchPokemon, getRandomPokemon };
};