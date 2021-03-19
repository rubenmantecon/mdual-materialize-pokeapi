(function ($) {
  $(function () {
		var tabs = document.getElementById("tabs-swipe-demo");
    $(".sidenav").sidenav();
    $(".tabs").tabs({ swipeable: true });
		var tabsInstance = M.Tabs.getInstance(tabs);
    $('a[name="pokemon"]').click(async function () {
			let pokemon = $('#pokemonText').val();
      console.log(pokemon); //Debug
      let response = ajaxCall(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, "GET");
      await processPokeAPIResponse(response);
			tabsInstance.select("test-swipe-2");


    });

  }); // end of document ready
})(jQuery); // end of jQuery name space


function processPokeAPIResponse(response) {
  for (const key in response) {
    if (key == "sprites") {
      console.log(response[key]["front_default"]);
      $('test-swipe-2').append($('img').attr("src", response[key]["front_default"]));
    }
    if (key === "name") {
      console.log(`${[response[key]]}`);
      //$(name).text(`${[response[key]]}`);
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
