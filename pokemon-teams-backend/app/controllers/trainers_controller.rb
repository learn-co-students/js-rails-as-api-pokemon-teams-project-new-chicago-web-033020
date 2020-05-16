class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers)
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        render json: TrainerSerializer.new(trainer)
    end
end
