import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import logo from './logo.svg';
import './App.css';

const GET_USERS = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USERS, {
    pollInterval: 500,
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h3>My app !</h3>
        <p>Posts:</p>
        <div>
          {data.users.map(e => (
            <li key={e.id}>{e.name}</li>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
