var ApiKey = "7647da20c13c44c4957155416252606" ; 
var searchInput = document.getElementById('searchInput');
var findBtn = document.getElementById('Find');
var row = document.getElementById('row');



window.addEventListener("load", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            userLat = position.coords.latitude;
            userLon = position.coords.longitude;

            await getWeatherByCoords(userLat, userLon);
        }, (err) => {
            console.error("🛑 Failed to get location", err);
        });
    } else {
        console.log("Geolocation not supported 😢");
    }})

findBtn.addEventListener('click',function(e){
    getDataAboutWeather();
    clearForm();
    
})


searchInput.addEventListener('keyup',function(){
    getDataAboutWeather();
})

async function getDataAboutWeather (){
    
    try{
       var searchResponse = await fetch(`https://api.weatherapi.com/v1/search.json?key=7647da20c13c44c4957155416252606&q=${searchInput.value}`);
       var searchData = await searchResponse.json(); 
       var lat = searchData[0].lat;
       var lon = searchData[0].lon;

       getWeatherByCoords(lat,lon)
       
    }
   
    catch(err){
        console.log(err);
        
    }
    
}

async function getWeatherByCoords(userLat, userlon) {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c5e37c6e8af641caae8154640252306&q=${userLat},${userlon}&days=3`);

        const data = await response.json();

        displayWeather(data);
        

    } catch (err) {
        console.error("❌ Error getting weather:", err);
    }
}
    

function displayWeather(data){

    var forecast = data.forecast.forecastday;
    var city = data.location.name;
    

    var daysNames = forecast.map(d => new Date(d.date).toLocaleDateString("en-US", { weekday: 'long' }));
    
    var dates =  forecast.map(d => 
        new Date(d.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short"
        })
        );

        

    var day1 = forecast[0];
    var day2 = forecast[1];
    var day3 = forecast[2];

    row.innerHTML = `<div class="col-md-4 p-0">
                        <div class="color1 h-12 d-flex justify-content-between">
                            <p class="mt-2  ms-2 ">${daysNames[0]}</p>
                            <p class="mt-2  me-2 ">${dates[0]}</p>
                        </div>

                        <div class="color3 h-95">
                             <p class="ms-4">${city}</p>
                             <h3 class="ms-4 font">${data.current.temp_c}°C</h3>
                             <img class="ms-4" src="https:${day1.day.condition.icon}" alt="">
                             <p class="ms-4 blue">${data.current.condition.text}</p>
                             <div class="d-flex ms-4">
                                 <img class="img me-1" src="img/icon-umberella.png" alt="">
                                 <p class="me-3">20%</p>
                                 <img class="img me-1" src="img/icon-wind.png" alt="">
                                 <p class="me-3">18km/h</p>
                                 <img class="img mt-1 me-1" src="img/icon-compass.png" alt="">
                                 <p class="me-3">East</p>
                             </div>
                        </div>
                        
                    </div>

                    <div class="col-md-4 p-0">
                        <div class="h-12 color2">
                            <p class="text-center pt-1 m-0">${daysNames[1]}</p>
                        </div>

                        <div class="h-95 text-center pt-5 color4">
                            <img src="https:${day2.day.condition.icon}" width="50px" alt="">
                            <h3 class="pt-3">${day2.day.maxtemp_c}°C</h3>
                            <p>${day2.day.mintemp_c}°C</p>
                            <p class="blue">${day2.day.condition.text}</p>
                        </div>
                        
                    </div>

                    <div class="col-md-4 p-0">
                        <div class="color1 h-12">
                            <p class="text-center p-1 m-0">${daysNames[2]}</p>
                        </div>

                        <div class="color3 h-95 pt-5 text-center">
                            <img src="https:${day3.day.condition.icon}" width="50px" alt="">
                            <h3 class="pt-3">${day3.day.maxtemp_c}°C</h3>
                            <p>${day3.day.mintemp_c}°C</p>
                            <p class="blue">${day3.day.condition.text}</p>            
                        </div>
                    </div>`
}


function clearForm(){
    searchInput.value='';
}

