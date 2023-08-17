'use strict';
	const registroBtn = document.querySelector('#registroBtn')
	const registroUser = document.querySelector('#registroUser')
	const registroEmail = document.querySelector('#registroEmail')
	const registroPass = document.querySelector('#registroPass')

		let validar = () => {
			let inputs_requeridos = document.querySelectorAll('#frmRegistro [required]')
			let error = false;

			for(let i = 0; i < inputs_requeridos.length; i++){
				if(inputs_requeridos[i].value == '' ){
					inputs_requeridos[i].classList.add('input-error')
					error = true
				}else {
					inputs_requeridos[i].classList.remove('input-error')
				}
			}

			return error;
		}
		let limpiar = () =>{
			registroUser.value = ""
			registroEmail.value = ""
			registroPass.value = ""
		}
		let obtenerDatos = () => {
			let error = validar()
				if(error){
					Swal.fire({
						'title': "Sus datos no fueron cargados correctamentes",
						'text': "Por favor completar todos los datos",
						'icon': "warning"
					})
				}else{
					Swal.fire({
						'title': "Registro exitoso",
						'text': "Bienvenido!",
						'icon': "success"
				})
				
				console.log(registroUser.value)
				console.log(registroEmail.value)
				console.log(registroPass.value)
				limpiar()
		}
	}
		registroBtn.addEventListener('click', obtenerDatos);