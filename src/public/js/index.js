const socket = io()

const  chatBox = document.getElementById('chatBox')

const swal = async () => {
    try {
        const result = await Swal.fire({
            title: 'Identificate',
            input: 'text',
            text: 'ingresa un usuario para chatear',
            inputValidator: value => {
                return !value && 'necesitas ingresar un usuario'
            },
            allowOutsideClick: false,
        })

        const user = result.value

        socket.emit('newUser', user)

        socket.on('userConnected', user =>{
            Swal.fire({
                text: `Bienvenido ${user} al chat`,
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar:  true,
                icon: 'succes',
            })
        })


        chatBox.addEventListener('keyup', event =>{
            if(event.key === 'Enter'){
                if(chatBox.value.trim().length > 0){
                    socket.emit('message', {user, message: chatBox.value})
                    chatBox.value = ''
                }
            }
        })  
    } catch (error) {
        console.log(error);
    }
}



socket.on('messageLogs', data => {
    const log = document.getElementById('messageLogs')
    let messages = ''

    data.forEach(messages => {
        messages = messages + `${message.user}: ${message.message} </br>`
    })

    log.innerHTML = messages
})

swal()