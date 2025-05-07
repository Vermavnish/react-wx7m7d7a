// Bartan Booking App - React + Tailwind CSS (Deployable on GitHub + Netlify)
import React, { useState } from 'react';
import { format } from 'date-fns';

const initialInventory = {
  bhagon: 12, tap: 5, tasa: 12, balti: 16,
  karchul: 16, chulha: 2, drum: 2, kisti: 16,
  buffet: 12, kathra: 3, dustbin: 2,
};

let bookings = [];

export default function App() {
  const [selectedDate, setSelectedDate] = useState("2025-05-06");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formItems, setFormItems] = useState({ ...initialInventory });
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const alreadyBooked = bookings.find((b) => b.date === selectedDate);
    if (alreadyBooked) {
      setMessage("Is tareekh par bartan pehle se book hain.");
      return;
    }

    bookings.push({ name, phone, date: selectedDate, items: formItems });
    setMessage("Booking safalta purvak ho gayi!");
    setFormItems({ ...initialInventory });
    setName("");
    setPhone("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">Bartan Booking App</h1>

      <div className="bg-white shadow-md rounded p-4 mb-6">
        <label className="block mb-1">Naam:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-2 py-1 mb-3 rounded"
        />

        <label className="block mb-1">Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-2 py-1 mb-3 rounded"
        />

        <label className="block mb-1">Booking ki tareekh:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border px-2 py-1 mb-3 rounded"
        />

        <h2 className="text-xl font-semibold mt-4 mb-2">Items:</h2>
        {Object.keys(initialInventory).map((item) => (
          <div key={item} className="flex items-center mb-2">
            <label className="w-32 capitalize">{item}:</label>
            <input
              type="number"
              min="0"
              value={formItems[item]}
              onChange={(e) =>
                setFormItems({ ...formItems, [item]: parseInt(e.target.value || 0) })
              }
              className="border px-2 py-1 w-24 rounded"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Booking Karein
        </button>

        {message && <p className="mt-4 font-medium text-green-700">{message}</p>}
      </div>
    </div>
  );
}