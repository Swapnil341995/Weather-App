const place = document.querySelector('input');
const form = document.querySelector('form');

let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')
messageOne.textContent = '';
messageTwo.textContent = '';

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = place.value;
    if(location){
        fetch('http://localhost:3000/weather?address='+location).then((res)=>{
            res.json().then((data)=>{
                if(data.error){
                    // console.log('Error',data.error);
                    messageOne.textContent = data.error;
                }
                else{
                    // console.log(data.forecast);
                    // console.log(data.location);
                    // console.log(data.placeName);
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        });
    }
    else{
        // console.log('Incorrect location.');
        messageOne.textContent = 'Incorrect location';
    }
})