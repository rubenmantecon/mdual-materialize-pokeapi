(function ($) {
  $(function () {
		var tabs = document.getElementById("tabs-swipe-demo");
    $(".sidenav").sidenav();
    $(".tabs").tabs({ swipeable: true });
		var tabsInstance = M.Tabs.getInstance(tabs);
    $('a[name="pokemon"]').click(async function () {
      $(".pokecardcontainer > ul").empty()
			let pokemon = $('#pokemonText').val();
      if (pokemon) {
        try {
          let response = await ajaxCall(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, "GET");
          processPokeAPIResponse(response);
          tabsInstance.select("test-swipe-2");
          
        } catch (error) {
          alert("Oiga, este pokémon no existe")
        }
      }


    });

  }); // end of document ready
})(jQuery); // end of jQuery name space


function processPokeAPIResponse(response) {

    for (const key in response) {
      console.log(key);
      if (key == "sprites") {
        let url = response[key]["front_default"];
        $('#test-swipe-2 > div > img').attr('src', url);
      }
      if (key === "name") {
        $('.pokecardcontainer > h4').text(`${[response[key]]}`).css("text-transform", "capitalize");
      }
      if (key === "species") {
        //
      }
       if (key === "moves") {
        console.log(response[key])
        let species = response[key];
        let ul = $('.pokecardcontainer > ul');
        let ulP = $('.pokecardcontainer > p');
        ulP.text(`Els primers cinc moviments de ${response["name"]} són:\n`)
        for (let index = 0; index < 5; index++) {
          const element = species[index];
          ul.append($(`<li>${element["move"]["name"]}</li>`).css("text-align", "left"))
  
        
        }
      } 
  
    }
  }

async function ajaxCall(url, verb, data) {
	let response = await fetch(url, {
		method: verb,
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	response = await response.json();
	return response;
}
function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  //document.getElementById('deviceready').classList.add('ready');
}

document.addEventListener("deviceready", onDeviceReady, false);
