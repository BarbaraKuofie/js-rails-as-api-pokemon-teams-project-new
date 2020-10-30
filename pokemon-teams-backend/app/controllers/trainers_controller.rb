class TrainersController < ApplicationController
    def index
        @trainers = Trainer.all
        render :json => @trainers
    end
    def show
        puts "The id is #{params[:id]}"
        @trainer = Trainer.find(params[:id])
        puts "The Trainer Name is #{@trainer.name}"
        @pokemons = @trainer.pokemons
        render :json => @pokemons
    end

end
