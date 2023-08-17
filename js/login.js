//codigo para Login
const username = document.getElementById('userName');
const password = document.getElementById('password');
const button = document.getElementById('button');

button.addEventListener('click',(e) => {
    e.preventDefault()
    let datos = {
        username: username.value,
        password: password.value,
    }
    localStorage.setItem("datos", JSON.stringify(datos))
})