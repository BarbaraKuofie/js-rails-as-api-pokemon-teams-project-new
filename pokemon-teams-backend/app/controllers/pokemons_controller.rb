class PokemonsController < ApplicationController

    def destroy
        @pokemon = Pokemon.find(params[:id])
        @pokemon.destroy
    end
    def create
        #Gets a trainer ID from the button
        puts params
        @trainer = Trainer.find(params[:id])
        if @trainer.pokemons.length < 6
            #creates a pokemon only IF the trainer has less than 6 pokemon
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            @pokemon = Pokemon.create(nickname: name, species: species, trainer_id: @trainer.id)
            return render :json => @pokemon
        else
            #failure to create message. If this comes back the JS script will know not to render a new Pokemon.
            return render :json => ["This ain't it chief"]
        end
        puts "It shouldn't get here"
        render :json => @pokemon
    end
    
end
