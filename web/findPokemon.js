

/* global fetch */

function findPokemon() {
       var obj={};
   obj.stats = document.getElementById('stats');
    obj.types = document.getElementById('types');
    obj.attacks = document.getElementById('attacks');
   obj.name = document.getElementById('name');
    obj.height = document.getElementById('height');
  obj.weight = document.getElementById('weight');
    obj.attackDescription = document.getElementById("readMore");
    obj.image = document.getElementById('image');
   obj.text = document.getElementById('text1').value;

    obj.name.innerHTML = "";
    obj.height.innerHTML = "";
    obj.weight.innerHTML = "";
    obj.image.src = "";
    obj.attackDescription.innerHTML = "";
    obj.stats.innerHTML = "";
    obj.types.innerHTML = "";
    obj.attacks.innerHTML = "";


    obj.text = obj.text.toLowerCase();
    obj.text = obj.text.split(' ').join('');
    var inputCheck = document.getElementById('inputCheck');
    inputCheck.innerHTML = "";


    function handleErrors(response) {
        if (!response.ok) {
            inputCheck.innerHTML = "Error name entered is not a pokemon";
            throw Error(response.statusText);
        }
        return response;
    }

    fetch('https://pokeapi.co/api/v2/pokemon/' + obj.text)
            .then(handleErrors)
            .then(response => {
                console.log("response");
                return response.json();
            })
            .then(pokeInfo => {
                obj.name.innerHTML = pokeInfo.name;
                obj.height.innerHTML = pokeInfo.height + " decimeters";
                obj.weight.innerHTML = pokeInfo.weight + " hectograms";
                var pokeImage = pokeInfo.sprites.front_default;
                obj.image.src = pokeImage;
                //types list
                obj.types.innerHTML = "";
                var typesList = pokeInfo.types;
                for (var i = 0; i < typesList.length; i++) {
                    var listEle = document.createElement("li");
                    listEle.innerHTML = typesList[i].type.name;
                    obj.types.appendChild(listEle);
                }

                //stats table
                obj.stats.innerHTML = "";
                var statsList = pokeInfo.stats;
                for (var i = 0; i < statsList.length; i++) {
                    var row = document.createElement("tr");
                    var ele = document.createElement("td");
                    ele.innerHTML = statsList[i].stat.name;
                    ele.style.textAlign = "center";
                    row.appendChild(ele);
                    var ele = document.createElement("td");
                    ele.innerHTML = statsList[i].base_stat;
                    ele.style.textAlign = "center";
                    row.appendChild(ele);
                    var ele = document.createElement("td");
                    ele.innerHTML = statsList[i].effort;
                    ele.style.textAlign = "center";
                    row.appendChild(ele);
                    obj.stats.appendChild(row);
                }

                //attacks
                obj.attacks.innerHTML = "";
                var attacksList = pokeInfo.moves;
                for (var i = 0; i < attacksList.length; i++) {
                    var row = document.createElement("tr");
                    var ele = document.createElement("td");
                    ele.innerHTML = attacksList[i].move.name;
                    row.appendChild(ele);
                    var link = document.createElement("td");
                    link.innerHTML = "show details";
                    link.text = attacksList[i].move.url;


                    row.appendChild(link);
                    obj.attacks.appendChild(row);


                    link.onclick = function () {
                        var link = this.text;
                        console.log(link);
                        fetch(link)
                                .then(handleErrors)
                                .then(attackResponse => {
                                    console.log("response");
                                    return attackResponse.json();
                                })
                                .then(description => {
                                    obj.attackDescription.innerHTML = "ATTACK DESCRIPTION";

                                    var attackName = document.createElement("p");
                                    attackName.innerHTML = "NAME: " + description.name;
                                    obj.attackDescription.appendChild(attackName);

                                    var attackFlavor = document.createElement("p");
                                    attackFlavor.innerHTML = "FLAVOR TEXT: " + description.flavor_text_entries[0].flavor_text;
                                    obj.attackDescription.appendChild(attackFlavor);

                                    var attackAccuracy = document.createElement("p");
                                    attackAccuracy.innerHTML = "ACCURACY: " + description.accuracy;
                                    obj.attackDescription.appendChild(attackAccuracy);

                                    var attackPP = document.createElement("p");
                                    attackPP.innerHTML = "PP: " + description.pp;
                                    obj.attackDescription.appendChild(attackPP);

                                    var attackPower = document.createElement("p");
                                    attackPower.innerHTML = "POWER: " + description.power;
                                    obj.attackDescription.appendChild(attackPower);

                                    var attackType = document.createElement("p");
                                    attackType.innerHTML = "TYPE: " + description.type.name;
                                    obj.attackDescription.appendChild(attackType);
                                });
                    };
                }
            });
            
            return obj;
}
;

