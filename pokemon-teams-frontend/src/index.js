const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function main() {
    getTrainers()
    addPokemon()
    deletePokemon()
}

function trainerCard(trainer) {
    let trainerCardHolder = document.getElementById('trainers-holder')

    let trainerCard = document.createElement('div')
    trainerCard.setAttribute('data-id', trainer['id'])
    trainerCard.setAttribute('class', 'card')

    let trainerName = document.createElement('p')
    trainerName.className = 'trainer-card-name'
    trainerName.innerText = trainer['attributes']['name']

    let trainerPokemonAmount = document.createElement('span')
    trainerPokemonAmount.className = 'trainer-card-pokemon-amount'
    trainerPokemonAmount.innerText = `${trainer['attributes']['pokemons'].length} Pokemon`

    let trainerAddPokemon = document.createElement('button')
    trainerAddPokemon.className = 'trainer-card-add-pokemon-btn'
    trainerAddPokemon.innerText = 'Add Pokemon'

    let trainerPokemonList = document.createElement('ul')

    trainerCard.appendChild(trainerName)
    trainerCard.appendChild(trainerPokemonAmount)
    trainerCard.appendChild(trainerAddPokemon)
    trainerCard.appendChild(trainerPokemonList)

    for (const pokemon of trainer['attributes']['pokemons']) {
        // creation of list item (pokemon)
        let trainerPokemonListItem = document.createElement('li')
        trainerPokemonListItem.setAttribute('data-id', pokemon['id'])
        trainerPokemonListItem.className = 'trainer-card-pokemon-li'
        trainerPokemonListItem.innerText = `${pokemon['species']} | ${pokemon['nickname']}`

        // creation of list item delete (delete pokemon)
        let trainerPokemonDeleteBtn = document.createElement('button')
        trainerPokemonDeleteBtn.className = 'trainer-card-pokemo-delete-btn'
        trainerPokemonDeleteBtn.innerText = 'Remove pokemon'
        trainerPokemonListItem.appendChild(trainerPokemonDeleteBtn)

        trainerPokemonList.appendChild(trainerPokemonListItem)
    }

    trainerCardHolder.appendChild(trainerCard)
}

function getTrainers() {
    fetch(TRAINERS_URL)
        .then(response => {
            return response.json()
        })
        .then(trainer => {
            const trainerObjs = trainer['data']
            for (const trainer of trainerObjs) {
                trainerCard(trainer)
            }
        })
}

function addPokemon() {
    document.addEventListener('click', function(event) {
        if (event.target.className === 'trainer-card-add-pokemon-btn') {
            let trainer = event.target.parentElement
            let trainerId = trainer.dataset.id

            let pokemonList = event.target.nextSibling

            console.log(trainerId)
            
            const newPokemonUrl = `http://localhost:3000/pokemons`

            const newData = {
                'trainer_id': trainerId
            }

            const configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newData)
            }

            fetch(newPokemonUrl, configObj)
                .then(response => {
                    return response.json()
                })
                .then(pokemon => {
                    location.reload()
                }) 
        }
    })
}

function deletePokemon() {

    document.addEventListener('click', function(event) {
        if (event.target.className === 'trainer-card-pokemo-delete-btn') {
            let pokemonLi = event.target.parentElement
            let pokemonId = event.target.parentElement.dataset.id

            location.reload()

            const pokemonDeleteUrl = `http://localhost:3000/pokemons/${pokemonId}`

            const configObj = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accepts': 'application/json'
                }
            }

            fetch(pokemonDeleteUrl, configObj)
                .then(response => {
                    return response.json()
                })
                .then(pokemon => {
                    pokemonLi.remove()
                })
        }
    })
}

main()
