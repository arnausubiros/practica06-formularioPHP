console.log('vinculado');

const formulario = document.getElementById('formulario');
const usuario = document.getElementById('texto-1');
const correo = document.getElementById('texto-2');
const mensaje = document.getElementById('texto-3');
//const mensaje = document.querySelector('#mensaje');
const boton = document.getElementById('boton');


formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('me diste submit')


    const data = new FormData(formulario)
    console.log(data.get('mensaje'))


    //trim limpia si el usuario puso caracteres en blanco
    if (!data.get('usuario').trim()) {
        console.log('no existe información, falta texto usuario !')

        campoError(usuario)

        //  usuario.classList.add('is-invalid')
        return
    } else {
        campoValido(usuario)
        //  usuario.classList.remove('is-invalid')
        // usuario.classList.add('is-valid')

    }

    if (!data.get('correo').trim()) {
        console.log('no existe información, falta texto correo !!')

        campoError(correo)
        // correo.classList.add('is-invalid')
        return
    } else {
        campoValido(correo)
        // correo.classList.remove('is-invalid')
        //correo.classList.add('is-valid')
    }

    if (!data.get('mensaje').trim()) {
        console.log('no existe información, falta texto mensaje!!')

        campoError(mensaje)
        // mensaje.classList.add('is-invalid')
        return
    } else {
        campoValido(mensaje)
        // mensaje.classList.remove('is-invalid')
        // mensaje.classList.add('is-valid')
    }





    console.log('todos los campos completados')

    // fetch solicitud del archivo PHP---------------------------   
    fetch('formulario.php', {
        method: "POST",
        body: data

    })
        .then(res => res.json())
        .then(datos => {

            console.log(datos);

            if (datos.console.error && datos.campo === 'usuario') {
                campoError(usuario);
                return;
            }
            campoValido(usuario)


            if (datos.console.error && datos.campo === 'correo') {
                campoError(correo)
                return
            }
            campoValido(correo);


            if (datos.console.error && datos.campo === 'mensaje') {
                campoError(mensaje);
                return
            }
            campoValido(mensaje);

            // //     if (!datos.error) {
            // //         limpiarFormulario(formulario)
            // //         campoValido(boton)
            // //     }



            // // })
            // // .catch(e => console.log(e))

            if (!datos.error) {
                limpiarFormulario(formulario);
                campoValido(boton)
            }
        })
        .catch((e) => {
            console.log(e)
            campoError(boton);
        });
},
    false
);



// //})



















const campoError = (campo) => {
    campo.classList.add('is-invalid')
    campo.classList.remove('is-valid')
}


const campoValido = (campo) => {
    campo.classList.remove('is-invalid')
    campo.classList.add('is-valid')
}



const limpiarFormulario = (formulario) => {
    console.log('mensaje enviado con exito')
    formulario.reset()
    usuario.classList.remove('is-valid')
    correo.classList.remove('is-valid')
    mensaje.classList.remove('is-valid')
}