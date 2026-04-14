import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import { loginUser } from './services/api';

export default function App() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser(username, password);
      setToken(data.accessToken);
      setIsLoggedIn(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      {/* LOGIN */}
      {!isLoggedIn ? (
        <div className="w-[360px] bg-white border rounded-xl p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-center">Login</h1>
          <p className="text-xs text-gray-500 text-center mb-4">
            Log in to access the feedback form.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              className="border rounded px-3 py-2"
              placeholder="emilys"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="border rounded px-3 py-2"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}

            <button className="bg-blue-600 text-white py-2 rounded font-semibold">
              Log In
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-4">

          {/* TOP BAR */}
          <div className="bg-zinc-900 text-white flex items-center justify-between p-3 rounded-md">
            <span className="text-green-400 text-sm font-semibold">
              ✓ Logged In
            </span>

            <div className="bg-white text-black text-xs px-2 py-1 rounded w-40 truncate">
              {token}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>

          {/* FORM */}
          <FeedbackForm token={token} />
        </div>
      )}
    </div>
  );
}