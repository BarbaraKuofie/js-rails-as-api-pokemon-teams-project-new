const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainer_container = document.getElementById("trainer-container")

function getTrainerInfo() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainer => renderManyTrainers(trainer))
}
function renderSingleTrainer(trainer) {
    const div = document.createElement("div")
    div.innerHTML = `<p>${trainer.name}</p>`
    btn = document.createElement("button")
    btn.innerText = "Add Pokemon"
    
    //Create the Button for Adding a Pokemon.
    btn.addEventListener("click", function(e) {
        formData = new FormData()
        formData.append('id', trainer.id)
        const reqObj = {
            method: "POST",
            body: formData
        }
        fetch(POKEMONS_URL, reqObj)
        .then(resp => resp.json())
        .then(function(json) {
            if (json[0] != "This ain't it chief"){
                ul =div.childNodes[2]
                renderSinglePokemon(json, ul)
            } else {
                alert(json[0])
            }
        })

    })
    div.append(btn)
    div_id = document.createAttribute("data-id")
    div_id.value = trainer.id
    div.setAttributeNode(div_id)
    div.classList.add("card")
    trainer_container.append(div)
    renderPokemonInfo(trainer, div)
}
function renderManyTrainers(json) {
    json.forEach(function(trainer){
        renderSingleTrainer(trainer)
    })
}
function renderSinglePokemon(pokemon, ul){
        li = document.createElement('li')
        li.innerHTML = `${pokemon.nickname} (${pokemon.species}) `
        btn = document.createElement('button')
        btn.classList.add("release")
        btn_id = document.createAttribute("data-pokemon-id")
        btn_id.value = pokemon.id
        btn.innerText = "Release"
        btn.setAttributeNode(btn_id)
        li.appendChild(btn)
        btn.addEventListener("click", function(e){
            const reqObj = {
            method: "DELETE"
           } 
            fetch(`${POKEMONS_URL}/${pokemon.id}`, reqObj)
            .then(resp => console.log(resp))
            .then(function(json) {  
                e.target.parentNode.remove()
            })
        })
        ul.appendChild(li)
}
function renderPokemonInfo(trainer, parent) {
    const id = trainer.id
    fetch(`${TRAINERS_URL}/${id}`)
    .then(resp => resp.json())
    .then(function(pokemons){
        ul = document.createElement('ul')
        pokemons.forEach(function(pokemon){
            renderSinglePokemon(pokemon,ul)
        })
        parent.appendChild(ul)
    })
}


function main(){
    getTrainerInfo()
}

main()