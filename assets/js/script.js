// 2bfd37d5d2aa41c253c3db29c2f30228
// https://api.openweathermap.org/data/2.5/forecast?q=Longmont&appid=2bfd37d5d2aa41c253c3db29c2f30228

var searchBtn = document.querySelector('.search-btn');
var input = document.querySelector('#search-input');

searchBtn.addEventListener('click', function(event) {
    console.log(input.value);
   
  
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&units=imperial&appid=2bfd37d5d2aa41c253c3db29c2f30228`)
    .then(response => {
        console.log(response)
        return response.json()
    }) .then(data =>{
    console.log(data)
    })
})
