window.addEventListener("load", function(){
	var thebutton = window.document.getElementById("clicker");
	

	var baseURL = window.location.href
	var api = "api"


	const newUniqueCountries = []
	 d3.json(baseURL + api).then(function(data) {

		uniqueCountries = data.map(x => x.country.trim()).filter((v, i, a) => a.indexOf(v) === i); 
		uniqueCountries.sort()
		

		for (i = 0; i < uniqueCountries.length; i++){
			newUniqueCountries.push(uniqueCountries[i])
		}

	});



d3.select("#theArtists").on("change", function(){
	var labelArtistSong = []
	var ySongDiration = []
	var xSongYear = []


	var aArtist = document.getElementById("theArtists");
	var artist = aArtist.options[aArtist.selectedIndex].value;
	
	var artistBaseURL = "api/filter"
	d3.json(baseURL + api + "/filter/" + artist).then(function(data) {
		
		d3.select(".section-content-ul").selectAll("li").remove();
		Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(`<div class="row"><div class="col-md-4 returnYear"><h2>${data[key]['year']}</h2></div> <div class="col-md-8 returnArtistSong"><h2>${data[key]['artist']}</h2><h4>${data[key]['title']}</h4></div></row>`));
		

		data.forEach(x => labelArtistSong.push(x.title));
		data.forEach(y => ySongDiration.push(y.duration));
		data.forEach(z => xSongYear.push(z.year))
		
		d3.select("#plotsTwo").selectAll("div").remove();

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

	});
});



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



var geoJsonLayer = L.geoJson(countries, {

  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {

  	if (featureData.properties.name == "Canada"){
  	var myStyle = {
    	"color": "rgb(224,49,37)",
    	"weight": 5,
    	"opacity": 0.65
	};

L.geoJSON([countries[28], countries[8], countries[13], countries[44], countries[53], countries[56], countries[42], countries[76], countries[79],countries[81], countries[82], countries[121], countries[123], countries[143], countries[153],countries[170], countries[58]], {
    style: myStyle
}).addTo(myMap);
  	}


    // featureData contains the actual feature object
    // featureLayer contains the indivual layer instance
    featureLayer.on('click', function () {
    	d3.select(".section-content-ul").selectAll("li").remove();
  		d3.select("#theArtists").selectAll("option").remove()
  		d3.select("#plotsTwo").selectAll("div").remove();

  		d3.select("#theArtists").append('option').html("Filter by Artist")
      // Fires on click of single feature
      var baseURL = window.location.href;
      var countryAPI = "api/" + featureData.properties.name;
      d3.json(baseURL + countryAPI).then(function(data) {
				
      		if (data.length === 0){
      			d3.select('.section-content-ul').append('li').html(`<p class="noHitText">There are 0 hits from <span>${featureData.properties.name}</span>. Try clicking on a <span class='red'>red</span> country.</p>`)
      		}else{
      		Object.keys(data).forEach(key => d3.select('.section-content-ul').append('li').html(`<div class="row"><div class="col-md-4 returnYear"><h2>${data[key]['year']}</h2></div> <div class="col-md-8 returnArtistSong"><h2>${data[key]['artist']}</h2><h4>${data[key]['title']}</h4></div></row>`))
      		var uniqueArtists = data.map(x => x.artist.trim()).filter((v, i, a) => a.indexOf(v) === i); 
			uniqueArtists.sort();
			uniqueArtists.forEach(artist => d3.select("#theArtists").append('option').html(artist));
			}
		});

    const ar = []
  	const nm = []


      var countryHitsAPI = "api/data/filter/" + featureData.properties.name;
      d3.json(baseURL + countryHitsAPI).then(function(data){
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
    		type: 'bar'
  		}
		];
		var layout = {
  			autosize: false,
  			title: 'Triple J\s Hottest 100 Hits',
  			yaxis: {title: '# of Hits'}
  		}
		
		Plotly.newPlot('plots', plotsData, layout);
	}
setTimeout(function(){ timeIt(); }, 1500);
      	//end chart countries
    });
  }

  
}).addTo(myMap);

var layout = {
  			title: 'Artist Hits',
  			xaxis: {title: 'Year'},
  			yaxis: {title: 'Duration'}
  		}


d3.select(thebutton).on("click", function(){
		console.log('clicking is working');

		var a = window.document.getElementsByTagName('video');
		console.log(a);
		//a.play();
	});

console.log("loaded");
});





