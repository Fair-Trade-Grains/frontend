import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://wheat-cute-api.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query {
        allGrains {
          name
          id
          moisture
          fallingNumber
          protein
          testWeight
          farmersNotes
          farmerId
        }
      }
    `
  })
  .then(result => console.log(result))

client
  .query({
    query: gql`
      query {
        allFarmers {
          name
          grains
              {
              name
              }
        }
      }
    `
  })
  .then(result => console.log(result))

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
  ,
  document.getElementById('root')
);
