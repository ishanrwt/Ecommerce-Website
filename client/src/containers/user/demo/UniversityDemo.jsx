import React from "react";

export default function App() {
  const universities = [
    {
      id: 1,
      name: "Punjab Technical University",
      departments: ["Computer Science", "Electrical Engineering", "Mechanical Engineering"],
    },
    {
      id: 2,
      name: "Chitkara University",
      departments: ["Business Administration", "Law", "Arts & Humanities"],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <nav>
          <ul className="flex space-x-4 text-gray-800">
            <li>LIBRARY</li>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Support</li>
            <li>
              <span className="mr-1">🛒</span> Cart
            </li>
          </ul>
        </nav>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Browse Universities
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <div key={uni.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{uni.name}</h2>
                <ul className="space-y-1 text-gray-700">
                  {uni.departments.map((dept, idx) => (
                    <li key={idx}>{dept}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}