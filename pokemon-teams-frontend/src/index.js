const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const pokeContainer = document.querySelector('main')
function main(){

  getTrainers();
  // this watch for click on the entire pokemon container
  pokeContainer.addEventListener("click", handleClick)
}
// this function get all trainser from rails api
function getTrainers(){
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => renderTrainers(trainers));
}

// this is called after rails successfully returns json data
function renderTrainers(trainerList){
  //iterate through each trainer from the array of trainer returned
  trainerList.forEach(trainer => renderTrainer(trainer))
}

// this is to create a div for each trainer
function renderTrainer(trainer){
  // this is to get all pokemons under that trainer
  const trainerPokes = trainer.pokemons
  
  // this is to build the li list of all the trainer's pokemon
  let lis = ""
  trainerPokes.forEach((poke) => {
    lis += `<li> ${poke.nickname} (${poke.species})<button class="release" data-pokemon-id=${poke.id}>Release</button></li>`
  })
  // this is to build the trainer's div node inserting the li created above within the ul
  let trainerdiv = `<div class="card" id=${trainer.id} data-id=${trainer.id}>` +
  `<p>${trainer.name}</p><button data-action="add">Add Pokemon</button>` + 
  `<ul> ${lis} </ul>` + `</div>`
  //set the entire html string within the container
  pokeContainer.innerHTML += trainerdiv
  
}

// this handles clicks on the form. only release button and add button are handled
function handleClick(e){
  if (e.target.className === "release") {
    //build delete structure to delete pokeman
    const lid = e.target.parentNode
    const reqObj = {
      method: 'DELETE'
    }
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, reqObj)
    .then(resp => resp.json())
    .then(poked => removePoke(lid))

  } else if (e.target.dataset.action === "add") {
    // build data structure to add new pokemon
    // trainer id is in the data-id in parentNode
    const ul = e.target.parentNode.querySelector('ul')
    // check how many li this card has to make sure we don't add when it already has 6
    if (ul.childElementCount < 6) {
      e.preventDefault();
      const formData = {
        "trainer_id": e.target.parentNode.dataset.id
      }
      const reqObj = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
      fetch(POKEMONS_URL, reqObj)
      .then(resp => resp.json())
      .then(pokea => addPokemon(pokea))
    }
  }

  // this is to remove the pokemon from DOM
  function removePoke(lid){
    lid.parentNode.removeChild(lid)
  }

  // this is to add the pokeman added to the ul list in DOM 
  function addPokemon(pokea){
    const div = document.getElementById(pokea.trainer_id)
    const ul = div.querySelector('ul')
    const li = `<li> ${pokea.nickname} (${pokea.species})<button class="release" data-pokemon-id=${pokea.id}>Release</button></li>`
    ul.innerHTML += li
  }

}

main();
