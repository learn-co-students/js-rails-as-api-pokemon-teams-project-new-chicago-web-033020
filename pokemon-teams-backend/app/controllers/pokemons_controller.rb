class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all 
    render json: pokemons
  end

  def destroy
    puts params
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: pokemon
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    puts params
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params["trainer_id"].to_i)
    render json: pokemon
  end
end
