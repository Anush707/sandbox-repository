import React, { useState } from 'react';
import { sendFeedback } from '../services/api';

export default function FeedbackForm({ token }: { token: string }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = await sendFeedback(title, message, token);
    setId(data.id);
    setDone(true);
  };

  if (done) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md text-center">
        Thank you! Saved ID: {id}
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-md p-4 shadow-sm">
      <h2 className="font-semibold mb-3">Give Feedback</h2>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          className="border rounded px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border rounded px-3 py-2 h-24"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="bg-blue-600 text-white py-2 rounded">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}