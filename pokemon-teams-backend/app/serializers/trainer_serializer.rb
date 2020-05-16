class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :pokemons
end
