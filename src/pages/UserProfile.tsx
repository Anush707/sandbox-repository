import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <Link to="/" className="text-blue-500 hover:underline mb-6 block">
        ← Back to list
      </Link>
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p className="text-gray-600 mb-2">Phone: {user.phone}</p>
      <a
        href={`https://${user.website}`}
        className="text-blue-500 hover:underline"
        target="_blank"
      >
        {user.website}
      </a>
    </div>
  );
}