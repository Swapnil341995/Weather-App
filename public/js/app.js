const place = document.querySelector('input');

document.querySelector('input').addEventListener("keypress", function (event) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});

const form = document.querySelector('form');

let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')
let messageThree = document.querySelector('#message-3')
messageOne.textContent = '';
messageTwo.textContent = '';

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = place.value;
    if(location){
        fetch('/weather?address='+location).then((res)=>{
            res.json().then((data)=>{
                if(data.error){
                    messageOne.textContent = data.error;
                }
                else{
                    messageOne.textContent = data.placeName;
                    messageTwo.textContent = data.forecast;
                }
            })
        });
    }
    else{
        messageOne.textContent = 'Incorrect location';
    }
})