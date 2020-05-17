class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    trainer =Trainer.find(params[:trainer_id])
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer)
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:pokemon_id])
    pokemon.destroy
    render json: pokemon
  end

end
