import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    })
  }, []);


  async function handleAddRepository() { 
    const addRepos = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"]
    });

   return setRepos([...repos, addRepos.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    await api.get('repositories').then(response => {
      setRepos(response.data);
    });
  }

  async function handleAddLike(id) {
    await api.post(`repositories/${id}/like`);

    await api.get('repositories').then(response => {
      setRepos(response.data);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map( rep => (
          <li key={rep.id}>
            {rep.title} <br/>
            {rep.url} <br />
            {rep.techs.map(f => f+' ' )}<br />
            {rep.likes} <br />
          
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>

            <button onClick={() => handleAddLike(rep.id)}>
              Add Like
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
