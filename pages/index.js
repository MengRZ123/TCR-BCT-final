
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockSamples = [
  { id: 1, disease: 'MS', gender: 'Female', age: 42 },
  { id: 2, disease: 'AE', gender: 'Male', age: 35 },
  { id: 3, disease: 'GBM', gender: 'Female', age: 58 },
];

export default function Home() {
  const [filter, setFilter] = useState('');
  const filtered = mockSamples.filter(s => !filter || s.disease === filter);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>NeuroImmune Atlas</h1>
      <label>
        Filter by Disease:
        <select onChange={e => setFilter(e.target.value)} style={{ marginLeft: 10 }}>
          <option value="">All</option>
          <option value="MS">MS</option>
          <option value="AE">AE</option>
          <option value="GBM">GBM</option>
        </select>
      </label>

      <ul>
        {filtered.map(s => (
          <li key={s.id}>
            ID: {s.id}, Disease: {s.disease}, Gender: {s.gender}, Age: {s.age}
          </li>
        ))}
      </ul>

      <h2>Age Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filtered}>
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="age" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
