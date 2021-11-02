import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [beerlist, setBeerlist] = useState([]);
  const [randomBeer, setRandomBeer] = useState();
  const getRandomBeer = () => {
    const randomIndex = Math.floor(Math.random() * beerlist.length);
    setRandomBeer(beerlist[randomIndex]);
  }
  const getBeerlist = () => {
    fetch('https://api.sampleapis.com/beers/ale')
      .then(response => response.json())
      .then(setBeerlist)
      .catch(alert)
  }
  useEffect(getRandomBeer, [beerlist]);
  useEffect(getBeerlist, []);
  return (
    <div className="App">
      <header className="App-header">
        {randomBeer &&
          <img src={randomBeer.image} alt={randomBeer.name} />}
        <p>{!randomBeer ? 'Loading...' : randomBeer.name}</p>
          <button onClick={getRandomBeer}>Pick Again</button>
      </header>
    </div>
  );
}

export default App;
