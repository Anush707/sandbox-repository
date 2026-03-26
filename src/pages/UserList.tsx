import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="grid grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded-xl shadow">
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <Link
              to={`/user/${user.id}`}
              className="text-blue-500 hover:underline mt-2 block"
            >
              View Profile →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}