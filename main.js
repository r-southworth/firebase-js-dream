import './style.css'

const form = document.querySelector('form');

form.addEventListener('submit', async(e) =>{
  e.preventDefault();
  const data = new FormData(form);

  const response = await fetch('http://localhost:8080/dream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  });

  const {img} = await response.json();
  console.log({img});

  const result = document.querySelector('#result');
  result.innerHTML = `<img src=${img} width="512"/>`
})
