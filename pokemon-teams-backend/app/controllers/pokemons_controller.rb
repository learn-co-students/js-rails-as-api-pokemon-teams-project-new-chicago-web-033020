class PokemonsController < ApplicationController

  def create
    trainer = Trainer.find(params[:trainer_id])
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:id].to_i)
    render json: pokemon
    pokemon.delete
  end

end
