const place = document.querySelector('input');

document.querySelector('input').bind('input', function() {
    var c = this.selectionStart,
        r = /[^a-z0-9 .]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });

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
        fetch('/weather?address='+location).then((res)=>{
            res.json().then((data)=>{
                if(data.error){
                    messageOne.textContent = data.error;
                }
                else{
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        });
    }
    else{
        messageOne.textContent = 'Incorrect location';
    }
})