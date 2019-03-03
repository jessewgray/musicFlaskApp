window.addEventListener("load", function(){
   
	console.log("working")


	var baseURL = window.location.href
	var api = "api"

	var country = "England"
	var artist = "blur"
	var newAPI = "api/" + country + "/" + artist

	d3.json(baseURL + api).then(function(data) {
  		//console.log(data);

		Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(data[key]['year'] + ', ' + data[key]['artist'] + ', ' + data[key]['country'] + ', ' +data[key]['title'] + ', ' + data[key]['duration'] ));

		Object.keys(data).forEach(key => d3.select("#theCountries").append('option').html(data[key]['country']));
		Object.keys(data).forEach(key => d3.select("#theArtists").append('option').html(data[key]['artist']));
	

	});


	d3.select("#theCountries").on("change", function(){
		// var aCountry = document.getElementById("theCountries");
		// console.log(aCountry.options[aCountry.selectedIndex].value)
		var aCountry = document.getElementById("theCountries");
		var aArtist = document.getElementById("theArtists");
		var country = aCountry.options[aCountry.selectedIndex].value;
		var artist = aArtist.options[aArtist.selectedIndex].value;
		var newAPI = "api/" + country + "/" + artist;
		d3.select(".section-content-ul").selectAll("li").remove();
		d3.json(baseURL + newAPI).then(function(data) {
				
				Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(data[key]['year'] + ', ' + data[key]['artist'] + ', ' + data[key]['country'] + ', ' +data[key]['title'] + ', ' + data[key]['duration'] ));

			});
	});
	d3.select("#theArtists").on("change", function(){
		var aCountry = document.getElementById("theCountries");
		var aArtist = document.getElementById("theArtists");
		var country = aCountry.options[aCountry.selectedIndex].value;
		var artist = aArtist.options[aArtist.selectedIndex].value;
		var newAPI = "api/" + country + "/" + artist;
		d3.select(".section-content-ul").selectAll("li").remove();
		d3.json(baseURL + newAPI).then(function(data) {
				
				Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(data[key]['year'] + ', ' + data[key]['artist'] + ', ' + data[key]['country'] + ', ' +data[key]['title'] + ', ' + data[key]['duration'] ));

			});
	});



	// d3.json(baseURL + api).then(function(data) {
 //  		console.log(data);
	// 	Object.keys(data).forEach(key => d3.select("#theCountries").append('option').html(data[key]['country']));
	// 	Object.keys(data).forEach(key => d3.select("#theArtists").append('option').html(data[key]['artist']));

	// d3.select("#theCountries")
	// .append("option")
	// .html("select country");

	// d3.select("#theArtists")
	// .append("option")
	// .html("select artist");
	// });



var apiKey = "pk.eyJ1IjoiamVzc2V3Z3JheSIsImEiOiJjanMyZjlrNTgyNHJ1NDRucmFrenlxNzRjIn0.6IkPIeNDu0yEvsa46ONXGA";
var myMap = L.map("map", {
 center: [50.914101, -12.794220],
 zoom: 1
});


L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
 attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
 minZoom: 1,
 id: "mapbox.light",
 accessToken: apiKey
}).addTo(myMap);



//console.log(countries)
//L.geoJSON(countries).addTo(myMap)


var geoJsonLayer = L.geoJson(countries, {
  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {
    // featureData contains the actual feature object
    // featureLayer contains the indivual layer instance
    featureLayer.on('click', function () {
      // Fires on click of single feature
      console.log('Clicked feature layer ID: ' + featureData.id);
    });
  }
}).addTo(myMap);


});



