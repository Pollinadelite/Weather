let key = '6136484532d6b3a0bde6aeeed160c43d'
let city = 'Ставрополь'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=ru`
let inputCity = document.querySelector('#inputCity')
let iconLable = document.querySelector('#icon')
let descLable = document.querySelector('#descLable')
let tempLable = document.querySelector('#tempLable')
let feelsLikeLable = document.querySelector('#feelsLikeLable')
let windLable = document.querySelector('#windLable')

inputCity.value = ''
inputCity.addEventListener('keydown', function(event){
    console.log(event.key)
    if(event.key == 'Enter'){
        if(inputCity.value == ''){
            alert('Впиши город!')
            }
            else{
                getData()
            }
    }
    
})

function getData(){
    city = inputCity.value
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=ru`
    fetch(url)
        .then(data=>{
            console.log(data)
            if(data.ok){
                data.json()
                    .then(data=>{
                        let temp = data['main']['temp']
                        let feelsLike = data['main']['feels_like']
                        let description = data['weather'][0]['description']
                        let wind = data['wind']['speed']
                        let icon = data['weather'][0]['icon']
                        getDataWeather(temp,feelsLike,description,wind,icon)
                        // console.log(data)
                        // console.log(data['main']['temp'],data['weather'][0]['description'])
                    })
            }
        })
}

function getDataWeather(temp, feelsLike, description, wind, icon){
    console.log(temp, feelsLike, description, wind, icon)
    tempLable.innerHTML = 'Температура: ' + temp + '&deg;'
    feelsLikeLable.innerHTML = 'Ощущается как: ' + feelsLike + '&deg;'
    windLable.textContent = 'Скорость ветра: ' + wind + 'м/с'
    let newDesc = description[0].toUpperCase() + description.slice(1) 
    descLable.textContent = newDesc
    iconLable.src = `http://openweathermap.org/img/wn/${icon}@4x.png`
}
