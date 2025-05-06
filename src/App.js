// Beautified Bartan Booking App with Tailwind import React, { useState } from "react"; import { format } from "date-fns";

const initialInventory = { bhagon: 12, tap: 5, tasa: 12, balti: 16, karchul: 16, chulha: 2, drum: 2, kisti: 16, buffet: 12, kathra: 3, dustbin: 2, };

export default function App() { const [selectedDate, setSelectedDate] = useState("2025-05-06"); const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [formItems, setFormItems] = useState({ ...initialInventory }); const [message, setMessage] = useState(""); const [bookings, setBookings] = useState([]); const [editIndex, setEditIndex] = useState(-1);

const handleSubmit = () => { if (editIndex >= 0) { const updated = [...bookings]; updated[editIndex] = { name, phone, date: selectedDate, items: formItems }; setBookings(updated); setEditIndex(-1); setMessage("Booking update ho gayi hai."); } else { const alreadyBooked = bookings.find((b) => b.date === selectedDate); if (alreadyBooked) { setMessage("Is tareekh par bartan pehle se book hain."); return; } const newBooking = { name, phone, date: selectedDate, items: formItems }; setBookings([...bookings, newBooking]); setMessage("Booking safalta purvak ho gayi!"); }

setFormItems({ ...initialInventory });
setName("");
setPhone("");

};

const deleteBooking = (index) => { const updated = bookings.filter((_, i) => i !== index); setBookings(updated); setMessage("Booking delete kar di gayi hai."); };

const editBooking = (index) => { const b = bookings[index]; setName(b.name); setPhone(b.phone); setSelectedDate(b.date); setFormItems({ ...b.items }); setEditIndex(index); setMessage("Editing mode me aa gaye hain."); };

return ( <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 py-10 px-4 font-sans"> <div className="max-w-4xl mx-auto"> <h1 className="text-4xl font-bold text-center text-blue-900 mb-6 drop-shadow">Bartan Booking App</h1>

<div className="bg-white rounded-xl shadow-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700">Naam:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Booking ki tareekh:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-blue-800">Items:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(initialInventory).map((item) => (
          <div key={item} className="flex items-center space-x-3">
            <label className="capitalize w-24">{item}:</label>
            <input
              type="number"
              min="0"
              value={formItems[item]}
              onChange={(e) =>
                setFormItems({ ...formItems, [item]: parseInt(e.target.value || 0) })
              }
              className="border px-3 py-1 w-24 rounded-md border-gray-300"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
      >
        {editIndex >= 0 ? "Update Booking" : "Booking Karein"}
      </button>

      {message && <p className="mt-4 text-green-800 font-medium">{message}</p>}
    </div>

    {bookings.length > 0 && (
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Booking History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 border">Naam</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Tareekh</th>
                <th className="p-2 border">Items</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="p-2 border">{b.name}</td>
                  <td className="p-2 border">{b.phone}</td>
                  <td className="p-2 border">{b.date}</td>
                  <td className="p-2 border text-sm">
                    {Object.entries(b.items)
                      .filter(([_, v]) => v > 0)
                      .map(([k, v]) => `${v} ${k}`)
                      .join(", ")}
                  </td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => editBooking(index)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBooking(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
</div>

); }

