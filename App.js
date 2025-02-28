import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${query}`
      );
      setRepos(response.data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch repositories. Check your query or API limits.');
    }
  };

  return (
    <div className="App">
      <h1>Github Explorer</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search Github repositories..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a> - {repo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;