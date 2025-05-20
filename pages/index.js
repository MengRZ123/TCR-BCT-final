import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const mockSamples = [
  { id: 1, disease: 'MS', gender: 'Female', age: 42, region: 'Asia', genotype: 'HLA-DRB1*15:01', lifestyle: 'Smoker' },
  { id: 2, disease: 'AE', gender: 'Male', age: 35, region: 'Europe', genotype: 'HLA-DRB1*04:05', lifestyle: 'Non-smoker' },
  { id: 3, disease: 'GBM', gender: 'Female', age: 58, region: 'North America', genotype: 'IDH1 R132H', lifestyle: 'Smoker' },
];

function SampleFilter({ filters, handleChange, options }) {
  return (
    <div className="filter-panel">
      {Object.keys(filters).map((key) => (
        <div key={key} className="filter-item">
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <select name={key} onChange={handleChange} defaultValue="">
            <option value="">All</option>
            {options[key].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

function SampleList({ data }) {
  return (
    <ul className="sample-list">
      {data.map(s => (
        <li key={s.id}>
          <strong>ID:</strong> {s.id} | <strong>Disease:</strong> {s.disease} | <strong>Gender:</strong> {s.gender} | <strong>Age:</strong> {s.age} | <strong>Region:</strong> {s.region} | <strong>Genotype:</strong> {s.genotype} | <strong>Lifestyle:</strong> {s.lifestyle}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [filters, setFilters] = useState({
    disease: '',
    gender: '',
    region: '',
    genotype: '',
    lifestyle: '',
    age: ''
  });

  const filtered = mockSamples.filter(s =>
    (!filters.disease || s.disease === filters.disease) &&
    (!filters.gender || s.gender === filters.gender) &&
    (!filters.region || s.region === filters.region) &&
    (!filters.genotype || s.genotype === filters.genotype) &&
    (!filters.lifestyle || s.lifestyle === filters.lifestyle) &&
    (!filters.age || s.age.toString() === filters.age.toString())
  );

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const options = {
    disease: ['MS', 'AE', 'GBM'],
    gender: ['Male', 'Female'],
    region: ['Asia', 'Europe', 'North America'],
    genotype: ['HLA-DRB1*15:01', 'HLA-DRB1*04:05', 'IDH1 R132H'],
    lifestyle: ['Smoker', 'Non-smoker'],
    age: ['35', '42', '58']
  };

  return (
    <div className="container">
      <h1 className="header">🧬 NeuroImmune Atlas</h1>

      <SampleFilter filters={filters} handleChange={handleChange} options={options} />

      <h2 className="section-title">🧾 Matched Samples</h2>
      <SampleList data={filtered} />

      <h2 className="section-title">📊 Age Distribution</h2>
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
    </div>
  );
}
