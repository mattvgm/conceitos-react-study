import React,{useState,useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
      api.get('repositories').then(response=>{
        setRepositories(response.data);
      });
  },[]);

  async function handleAddRepository() {
      const response = await api.post('repositories',{
      title:"Repositorio Teste",
      url:"http://www.github.com/",
      techs : ["JS","Python"]
    }); 
    const repository=response.data;
    setRepositories([...repositories,repository]); 
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(eachRepo => eachRepo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map((eachRepo) =>{
            return(
            <li key={eachRepo.id}>
                <h1>{eachRepo.title}</h1>
                <button onClick={() => handleRemoveRepository(eachRepo.id)}>Remover</button>
            </li>
          )})}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
