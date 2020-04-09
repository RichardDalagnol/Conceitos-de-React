import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    function load() {
      api.get("repositories").then((response) => {
        setRepositories(response.data);
      });
    }
    load();
  }, []);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "teste",
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const deleteResponse = await api.delete(`/repositories/${id}`);
    if (deleteResponse.status === 204) {
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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
