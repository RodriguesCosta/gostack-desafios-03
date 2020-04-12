import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Umbriel ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`,
      techs: ["Node", "Express", "TypeScript"]
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    setRepositories(repositories.filter(repository => repository.id !== id ? repository : false))
  }

  async function getRepository() {
    const response = await api.get('/repositories')

    setRepositories(response.data)
  }

  useEffect(() => {
    getRepository()
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
