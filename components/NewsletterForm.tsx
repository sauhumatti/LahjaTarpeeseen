'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  
  const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Newsletter submission logic
    console.log('Subscribing email:', email);
    setEmail('');
  };
  
  return (
    <form className="max-w-md mx-auto flex gap-4" onSubmit={handleNewsletterSubmit}>
      <input
        type="email"
        placeholder="Sähköpostiosoitteesi"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        className="flex-1 py-2 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        required
      />
      <button
        type="submit"
        className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition"
      >
        Tilaa
      </button>
    </form>
  );
}