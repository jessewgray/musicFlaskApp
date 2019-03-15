window.addEventListener("load", function(){
   
	//console.log("working")


	var baseURL = window.location.href
	var api = "api"

	// var country = "England"
	// var artist = "blur"
	// var newAPI = "api/" + country + "/" + artist
	// var countryAPI = "api/" + country




//###################################
	const newUniqueCountries = []
	 d3.json(baseURL + api).then(function(data) {
  		//console.log(data);

		//Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(data[key]['year'] + ', ' + data[key]['artist'] + ', ' + data[key]['country'] + ', ' +data[key]['title'] + ', ' + data[key]['duration'] ));
		uniqueCountries = data.map(x => x.country.trim()).filter((v, i, a) => a.indexOf(v) === i); 
		uniqueCountries.sort()
		
		//console.log(uniqueCountries)

		for (i = 0; i < uniqueCountries.length; i++){
			newUniqueCountries.push(uniqueCountries[i])
		}
		//var uniqueArtists = data.map(x => x.artist.trim()).filter((v, i, a) => a.indexOf(v) === i); 
		//console.log(uniqueArtists.sort())

		//uniqueCountries.forEach(country => console.log(country));
		//uniqueArtists.forEach(artist => d3.select("#theArtists").append('option').html(artist));

	});
	//console.log(newUniqueCountries)
 
	



	// d3.select("#theCountries").on("change", function(){
	// 	// var aCountry = document.getElementById("theCountries");
	// 	// console.log(aCountry.options[aCountry.selectedIndex].value)
	// 	var aCountry = document.getElementById("theCountries");
	// 	var aArtist = document.getElementById("theArtists");	
	// 	var country = aCountry.options[aCountry.selectedIndex].value;
	// 	var artist = aArtist.options[aArtist.selectedIndex].value;
	// 	var newAPI = "api/" + country + "/" + artist;
	// 	d3.select(".section-content-ul").selectAll("li").remove();
	// 	d3.json(baseURL + newAPI).then(function(data) {
				
	// 			Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(data[key]['year'] + ', ' + data[key]['artist'] + ', ' + data[key]['country'] + ', ' +data[key]['title'] + ', ' + data[key]['duration'] ));

	// 		});
	// });
	// d3.select("#theArtists").on("change", function(){
	// 	var aCountry = document.getElementById("theCountries");
	// 	var aArtist = document.getElementById("theArtists");
	// 	var country = aCountry.options[aCountry.selectedIndex].value;
	// 	var artist = aArtist.options[aArtist.selectedIndex].value;
	// 	var newAPI = "api/" + country + "/" + artist;
	// 	d3.select(".section-content-ul").selectAll("li").remove();
	// 	d3.json(baseURL + newAPI).then(function(data) {
				
	// 			Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(data[key]['year'] + ', ' + data[key]['artist'] + ', ' + data[key]['country'] + ', ' +data[key]['title'] + ', ' + data[key]['duration'] ));

	// 		});
	// });



d3.select("#theArtists").on("change", function(){
	//console.log('Jesse')
	var labelArtistSong = []
	var ySongDiration = []
	var xSongYear = []


	var aArtist = document.getElementById("theArtists");
	var artist = aArtist.options[aArtist.selectedIndex].value;
	//console.log(artist);
	var artistBaseURL = "api/filter"
	d3.json(baseURL + api + "/filter/" + artist).then(function(data) {
		//console.log(data)
		d3.select(".section-content-ul").selectAll("li").remove();
		Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(data[key]['year'] + ', ' + data[key]['artist'] + ', ' + data[key]['country'] + ', ' +data[key]['title'] + ', ' + data[key]['duration'] ));
		

		data.forEach(x => labelArtistSong.push(x.title));
		data.forEach(y => ySongDiration.push(y.duration));
		data.forEach(z => xSongYear.push(z.year))
		// console.log(labelArtistSong);
		// console.log(ySongDiration);
		// console.log(xSongYear);
		console.log('remove plot two')
		d3.select("#plotsTwo").selectAll("div").remove();

		//

		var trace1 = {
  			x: xSongYear,
  			y: ySongDiration,
  			marker: {
    		color: 'rgb(224,49,37)'
  			},
  			mode: 'markers',
  			type: 'scatter'
		};
		var layout = {
  			title: 'Artist Hits',
  			xaxis: {title: 'Year'},
  			yaxis: {title: 'Duration'}
  		}
		var data = [trace1];
	
		

		Plotly.newPlot('plotsTwo', data, layout);
		//

	});
});


//#####################################


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
  	//console.log(featureData)
  	if (featureData.properties.name == "Canada"){
  		console.log(featureData);
  		var myStyle = {
    	"color": "red",
    	"weight": 5,
    	"opacity": 0.65
};

L.geoJSON(countries[28], {
    style: myStyle
}).addTo(myMap);
  	}


  	//console.log(featureLayer)
    // featureData contains the actual feature object
    // featureLayer contains the indivual layer instance
    featureLayer.on('click', function () {
    	d3.select(".section-content-ul").selectAll("li").remove();
  		d3.select("#theArtists").selectAll("option").remove()
  		d3.select("#plotsTwo").selectAll("div").remove();

  		d3.select("#theArtists").append('option').html("Filter by Artist")
      // Fires on click of single feature
      //console.log('Clicked feature layer ID: ' + featureData.id + ", " + featureData.properties.name);
      var baseURL = window.location.href;
      var countryAPI = "api/" + featureData.properties.name;
      d3.json(baseURL + countryAPI).then(function(data) {
				
      		console.log(data)
      		if (data.length === 0){
      			//console.log(data.length)
      			d3.select('.section-content-ul').append('li').html("No hits from " + featureData.properties.name + ", click a <span class='red'>red</span> country")
      		}else{
      		Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(data[key]['year'] + ', ' + data[key]['artist'] + ', ' + data[key]['country'] + ', ' +data[key]['title'] + ', ' + data[key]['duration'] ));

			var uniqueArtists = data.map(x => x.artist.trim()).filter((v, i, a) => a.indexOf(v) === i); 
			uniqueArtists.sort()
			//Object.keys(data).forEach(key => d3.select("#theCountries").append('option').html(data[key]['country']));
			uniqueArtists.forEach(artist => d3.select("#theArtists").append('option').html(artist));
			}
		});

    const ar = []
  	const nm = []


      var countryHitsAPI = "api/data/filter/" + featureData.properties.name;
      d3.json(baseURL + countryHitsAPI).then(function(data){
      	console.log(data)
      	for (i = 0; i<data.length; i++){
      	ar.push(data[i].artist)
      	nm.push(parseInt(data[i].numberOfHits))
		}
      });


      	//chart countries

    function timeIt(){
    	
      	var plotsData = [
  		{
    		x: ar,
    		y: nm,
    		marker: {
    		color: 'rgb(224,49,37)'
  			},
    	// 	x: [1999, 2000, 2001, 2002],
  			// y: [10, 15, 13, 17],
    		type: 'bar'
  		}
		];
		var layout = {
  			autosize: false,
  			// height: 500,
  			title: 'Triple J\s Hottest 100 Hits',
  			xaxis: {title: 'Artist'},
  			yaxis: {title: '# of Hits'}
  		}
		
		Plotly.newPlot('plots', plotsData, layout);
	}
setTimeout(function(){ timeIt(); }, 1500);
      	//end chart countries
      	console.log('still working')
    });
  }

  
}).addTo(myMap);

var layout = {
  			title: 'Artist Hits',
  			xaxis: {title: 'Year'},
  			yaxis: {title: 'Duration'}
  		}




});



