import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// กำหนด Type ป้องกันการใช้ any ตามข้อกำหนด 
interface LoginResponse {
    access_token: string;
}

interface RegisterResponse {
    message: string;
}

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

    // States สำหรับ Requirement [cite: 32, 33]
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg(null);

        try {
            if (isRegisterMode) {
                // ยิง API Register [cite: 9, 10, 11]
                await axios.post<RegisterResponse>('http://localhost:3000/register', {
                    username,
                    password,
                });
                alert('Registered successfully! Please login.');
                setIsRegisterMode(false); // สลับกลับมาหน้า Login
                setPassword(''); // เคลียร์รหัสผ่าน
            } else {
                // ยิง API Login [cite: 14, 15]
                const response = await axios.post<LoginResponse>('http://localhost:3000/login', {
                    username,
                    password,
                });

                // เก็บ JWT Token ลง LocalStorage 
                localStorage.setItem('access_token', response.data.access_token);

                // Redirect ไปหน้า Pokemon 
                navigate('/pokemon');
            }
        } catch (error: unknown) {
            // จัดการ Error สวยๆ 
            if (axios.isAxiosError(error)) {
                setErrorMsg(error.response?.data?.message || 'Something went wrong with the server.');
            } else {
                setErrorMsg('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false); // ปิด Loading ไม่ว่าจะสำเร็จหรือพัง 
        }
    };

    return (
        <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center',
            width: '100%',
            maxWidth: '350px'
        }}>

            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/500px-International_Pok%C3%A9mon_logo.svg.png"
                alt="Pokemon Logo"
                style={{ width: '150px', marginBottom: '20px', }}
            />

            <h1 className="pixel-font" style={{ fontSize: '2.5rem', marginTop: 0, color: '#FFCB05', textShadow: '2px 2px 0 #3B4CCA' }}>
                {isRegisterMode ? 'JOIN THE JOURNEY' : 'TRAINER LOGIN'}
            </h1>

            {errorMsg && (
                <div style={{ color: '#D32F2F', backgroundColor: '#FFEBEE', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' }}>
                    {errorMsg}
                </div>
            )}

            {/* Form กรอก username และ password  */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                />

                {/* ปุ่ม Submit พร้อม Loading State  */}
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: isLoading ? '#9E9E9E' : '#3B4CCA',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: '0.3s'
                    }}
                >
                    {isLoading ? 'Processing...' : (isRegisterMode ? 'Register' : 'Login')}
                </button>
            </form>

            {/* สลับโหมด Login / Register */}
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                {isRegisterMode ? 'Already a trainer?' : 'New to the region?'}
                <span
                    onClick={() => {
                        setIsRegisterMode(!isRegisterMode);
                        setErrorMsg(null);
                    }}
                    style={{ color: '#3B4CCA', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}
                >
                    {isRegisterMode ? 'Login here' : 'Register now'}
                </span>
            </p>
        </div>
    );
};