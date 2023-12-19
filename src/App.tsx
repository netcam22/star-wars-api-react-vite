import React from 'react';
import './App.scss';
import { Character } from './components/character';
import vader from './assets/images/vader.jpeg';
import luke from './assets/images/luke.jpeg';
import seethree from './assets/images/c3p0.jpeg';
import artoo from './assets/images/R2D2.jpeg';

function App() {
    return (
      <>
        <main className = "page page--space">
        <h1 className = "page__heading page__heading--gold">Star Wars</h1>
        <h2 className = "page__sub-heading page__sub-heading--lavendar">A long time ago in a galaxy far, far away....</h2>
        <section className ="page__container">
        <Character endPoint = "https://swapi.dev/api/people/1" image = {luke}/>
        <Character endPoint = "https://swapi.dev/api/people/4" image = {vader}/>
        <Character endPoint = "https://swapi.dev/api/people/2" image = {seethree}/>
        <Character endPoint = "https://swapi.dev/api/people/3" image = {artoo}/>
        </section>
        </main>
      </>
    )
}

export default App
