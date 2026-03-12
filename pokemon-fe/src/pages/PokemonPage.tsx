import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import "../App.css";

export const PokemonPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { pokemon, isLoading, error, searchPokemon, getRandomPokemon } = usePokemon();
    const navigate = useNavigate();

    // ป้องกันคนแอบเข้าหน้านี้โดยยังไม่ Login
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            searchPokemon(searchTerm);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    return (
        <>
            {/* Top Navigation Bar */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '70px',
                backgroundColor: '#3B4CCA',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000
            }}>
                {/* Logo Area */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" 
                        alt="Pokemon Logo" 
                        style={{ height: '40px', width: 'auto' }}
                    />
                </div>
                
                {/* User Profile & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFCB05', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#3B4CCA', fontWeight: 'bold' }}>
                            T
                        </div>
                        <span className="pixel-font" style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '1px' }}>Trainer</span>
                    </div>
                    <button onClick={handleLogout} style={{ backgroundColor: '#D32F2F', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Pokedex Content Container */}
            <div style={{ padding: '30px', width: '100%', maxWidth: '600px', boxSizing: 'border-box', margin: '100px auto 20px', textAlign: 'center', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                    <h1 className="pixel-font" style={{ margin: 0, color: '#3B4CCA', fontSize: '2.5rem' }}>POKEDEX</h1>
                </div>

            {/* ช่องค้นหา และ ปุ่มสุ่ม */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter Pokemon name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                />
                <button type="submit" disabled={isLoading} style={{ backgroundColor: '#FFCB05', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Search
                </button>
                <button type="button" onClick={getRandomPokemon} disabled={isLoading} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Random
                </button>
            </form>

            {/* Loading State */}
            {isLoading && <p className="pixel-font" style={{ fontSize: '1.5rem', color: '#666' }}>Searching in the tall grass...</p>}

            {/* Error Message */}
            {error && <p style={{ color: '#D32F2F', backgroundColor: '#FFEBEE', padding: '10px', borderRadius: '8px' }}>{error}</p>}

            {/* แสดงข้อมูลโปเกมอน */}
            {pokemon && !isLoading && (
                <div style={{ border: '2px solid #3B4CCA', padding: '20px', borderRadius: '12px', backgroundColor: '#F0F4F8' }}>
                    <h2 className="pixel-font" style={{ fontSize: '3rem', margin: '0 0 10px 0', textTransform: 'uppercase', color: '#3B4CCA' }}>{pokemon.name}</h2>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
                        {pokemon.types.map((type) => (
                            <span key={type} style={{ backgroundColor: '#A8A878', padding: '5px 15px', borderRadius: '20px', color: 'white', fontWeight: 'bold', textTransform: 'capitalize' }}>
                                {type}
                            </span>
                        ))}
                    </div>

                    <p style={{ margin: '5px 0' }}><strong>Weight:</strong> {pokemon.weight} hectograms</p>
                    <p style={{ margin: '5px 0' }}><strong>Abilities:</strong> {pokemon.abilities.join(', ')}</p>
                </div>
            )}
        </div>
        </>
    );
};