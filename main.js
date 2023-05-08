import './style.css'

const form = document.querySelector('form');

form.addEventListener('submit', async(e) =>{
  e.preventDefault();
  showLoading();
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


  if (response.ok){
  const {img} = await response.json();
  console.log({img});

  const result = document.querySelector('#result');
  result.innerHTML = `<img src=${img} width="512"/>`
  } else {
    const err = await response.test();
    alert(err);
    console.log(err)
  }

  hideLoading();
})

function showLoading(){
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>'
}

function hideLoading(){
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}