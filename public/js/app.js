console.log('Client sided file loaded.');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#firstP');
const messageTwo = document.querySelector('#secondP');

function getWeatherInfo(location) {
    return fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => {
            return response.json()
        });
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';

    return getWeatherInfo(location)
        .then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
});
