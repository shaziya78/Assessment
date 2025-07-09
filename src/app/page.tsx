
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye ,EyeOff  } from 'lucide-react';


export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


  const handleLogin = () => {
 const admins = [
      { username: 'shaziya', password: 'admin123' },
      { username: 'samreen', password: 'pass456' },
      { username: 'admin', password: 'admin' },
    ];

    const user = admins.find(
      (a) => a.username === username && a.password === password
    );

    if (user) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('username', user.username);
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-white">
      <div className="bg-black p-8 shadow-md w-96 rounded-2xl">
        <h1 className="text-2xl font-semibold text-white text-center">Welcome Back!</h1>
        <p className="text-sm text-gray-500 text-center">Please enter your details to sign in.</p>
        <label className="text-sm text-gray-500">Email:</label>
        <input
          className="border w-full mb-3 p-2 rounded text-gray-500 text-sm"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative">
             <label className="text-sm text-gray-500">Password:</label>
          <input
            className="border w-full mb-3 p-2 rounded pr-10 text-sm text-gray-500"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-7.5 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ?    <EyeOff />  :   <Eye />}
          </button>
        </div>
        <button onClick={handleLogin} className="bg-white w-full text-sm text-black font-semibold px-4 py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}