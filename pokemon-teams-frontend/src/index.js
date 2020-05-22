const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")
main.addEventListener("click", handleClicks)

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(resp=> resp.json())
  .then(trainers => renderTrainers(trainers))
}

function renderTrainers(trainers) {
  trainers.forEach(trainer=> {
    const trainerCard = `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>${renderPokemon(trainer)}</ul></div>`
    main.innerHTML += trainerCard
  })
}

function renderPokemon(trainer) {
  return trainer.pokemons.map(pokemon => {
    return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  }).join("")

}

function handleClicks(event) {
  if (event.target.className === "add" && event.target.nextElementSibling.children.length < 6) {
    addPokemon(event)
  } else if (event.target.className === "release") {
    releasePokemon(event)
  }
}

function addPokemon(event) {
  event.preventDefault()
  const trainerId = event.target.dataset.trainerId
  const ul = event.target.nextElementSibling
  
  const formData = {
    trainer_id: parseInt(trainerId)
  }

  const formObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(POKEMONS_URL, formObj)
  .then(resp => resp.json())
  .then(pokemon => {
    const newPoke = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    ul.innerHTML += newPoke
  })
}

function releasePokemon(event) {
  event.preventDefault();
  const releasePoke = event.target.dataset.pokemonId

  const formData = {
    pokemon_id: parseInt(releasePoke)
  }
  const formObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(`${POKEMONS_URL}/${releasePoke}`, formObj)
  .then(resp=>resp.json())
  .then(()=>event.target.parentNode.remove())

  
}



fetchTrainers()