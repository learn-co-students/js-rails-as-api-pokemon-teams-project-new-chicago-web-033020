class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon, except: [:created_at, :updated_at]
    end

    def new
        
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name

        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id].to_i)

        render json: pokemon, except: [:created_at, :updated_at]
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end
end
