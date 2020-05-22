const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainContainer = document.querySelector("main")

// fetch trainers from json data
// grab trainer.pokemons 
// render pokemons on DOM

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainers => { 
    mainContainer.innerHTML = renderTrainers(trainers)
  })
}

function renderTrainers(trainer) {
  return trainer.map(renderOneTrainer).join("")
}

function renderOneTrainer(trainer) {
  return (`<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  <ul> ${trainerPokemon(trainer)}
  </ul>
  </div>`)
}

function trainerPokemon(trainer) {
  let pokemonList = trainer.pokemons.map(elem => {
    return (`<li>${elem.nickname} (${elem.species}) <button class="release" data-pokemon-id="${elem.id}"> Release </button></li>`)
  }).join("")
  return pokemonList
}

// find add pokemon button element
// add event listener to add pokemon button
// send fetch request (post)
// model -> check # of pokemon on team


mainContainer.addEventListener("click", function(event) {
  if (event.target.dataset.trainerId) {
    handleAdd(event)
  } else if (event.target.className === "release") {
    handleRelease(event)
  }
})

function handleAdd(event) {
  const trainerId = event.target.dataset.trainerId
  event.preventDefault()

  let formObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "trainer_id": trainerId
    })
  }

  let ul = event.target.parentNode.lastElementChild
  if (parseInt(ul.children.length) < 6) {
    fetch(POKEMONS_URL, formObj)
    .then(response => response.json())
    .then(newPoke => {
      // console.log(newPoke)
      ul.innerHTML += `<li>${newPoke.nickname} (${newPoke.species}) <button class="release" data-pokemon-id="${newPoke.id}"> Release </button></li>`
    })
  }
}

function handleRelease(event) {
  event.preventDefault()
  // console.log(event.target.dataset.pokemonId)

  let formObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "pokemon_id": event.target.dataset.pokemonId
    })
  }

  fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, formObj)
  .then(response => response.json())
  .then(() => {
    event.target.parentNode.remove()
  })

}


fetchTrainers();
