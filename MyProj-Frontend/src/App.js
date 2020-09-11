import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState();

  const api_host = process.env.REACT_APP_API_HOST || "http://localhost:8080/";
  useEffect(() => {
    let interval = setInterval(() => {
      fetch(api_host)
        .then(res => res.json())
        .then((result) => {
          setData({ cats: result })
        }).catch((error) => {
          setData({ error: error })
        })
    }, 1000);
    return () => clearInterval(interval);
  }, [api_host])

  if (!data) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>My app !</h3>
        {data.error ? (
          <div className="App-error">{`Error! ${data.error}`}</div>
        ) : (
            <>
              <p>Cats:</p>
              <div>
                {data.cats.map(e => (
                  <li key={e.name}>{e.name}</li>
                ))}
              </div>
            </>
          )}
      </header>
    </div>
  );
}

export default App;
