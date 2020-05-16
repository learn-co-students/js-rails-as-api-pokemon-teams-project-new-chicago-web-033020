const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName("main")[0]

// This function holds all the functions that make the application run, as well as all event listeners
function mainFunction(){
  getData()
  main.addEventListener("click", dealWithClick)
}

function getData(){
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json => renderData(json))
}

function renderData(allTrainers){
  let allTrainersArray = []
  allTrainers.forEach(trainer => {
    let trainerHTML = 
    `<div class="card" data-id="${trainer.id}">
      <p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>
        ${pokemonList(trainer)}
      </ul>
    </div>`
    allTrainersArray.push(trainerHTML)
  })
  main.innerHTML = allTrainersArray.join('')
}

function pokemonList(trainer){
  const pokeList = trainer.pokemon.map(poke => {
    return `<li>${poke.species} (${poke.nickname}) <button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
  }).join('')
  return pokeList
}

function dealWithClick(event){
  if (event.target.className === "release"){
    releaseSpecificPokemon(event)
  } else if (event.target.dataset.trainerId && event.target.parentElement.lastElementChild.childElementCount < 7 )
    addSpecificPokemon(event)
}

function releaseSpecificPokemon(event){
  const pokemonId = event.target.dataset.pokemonId

  const formData = {
    id: pokemonId
  }

  const reqObj = {
    method: 'DELETE',
    body: JSON.stringify(formData)
  }

  fetch(`${POKEMONS_URL}/${pokemonId}`, reqObj)
  .then(response => response.json())
  .then(deletedPoke => {
    const poke = document.querySelector(`.release[data-pokemon-id="${deletedPoke.id}"]`)
    poke.parentElement.remove();
  });
}

function addSpecificPokemon(event) {
  const trainerCard = event.target.parentNode

  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerCard.dataset.id
    })
  }

  fetch(POKEMONS_URL, reqObj)
  .then(response => response.json())
  .then(newPokemon => {
    const trainer = document.querySelector(`.card[data-id="${newPokemon.trainer_id}"]`)
    const pokeHTML = `<li>${newPokemon.species} (${newPokemon.nickname}) <button class="release" data-pokemon-id="${newPokemon.id}">Release</button></li>`
    trainer.lastElementChild.innerHTML += pokeHTML
  })
}

mainFunction()
