$( document ).ready(function() {
    console.log( "Esta funcionando correctamente" );

    $("#sendForm").click( function(){
        
    
        // Validar datos
        let name        = $("#nameForm").val();
        let email       = $("#emailForm").val();
        let telefono    = $("#telephoneForm").val();

        

        // Verificar que no este vació
        if( name.trim() === '' || email .trim() === '' || telefono.trim() === '' ){
            viewModal("Los campos no deben de estar vacios", "error", "#F27474");
            return;
        }

        //Name
        if(name.length < 4 ){
            viewModal("El nombre de de tener más de 4 carácteres", "error", "#F27474");
            return;
        }
        
        // Email
        if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ){
            viewModal("Email no válido", "error", "#F27474");
            return;
        }
        
        // Telephone
        if( !/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(telefono)){
            viewModal("Télefono no válido", "error", "#F27474");
            return;
        }

            
        // Implementar axios
        //https://jsonplaceholder.typicode.com/users
        //https://floreria-jazmin.herokuapp.com/api/users/create
        axios.post('https://floreria-jazmin.herokuapp.com/api/users/create', {
            nombre_completo     : name,
            email               : email,
            telefono_cel        : telefono
        })
        .then((response) => {
            console.log(response);
            viewModal(response.data.msg, "success", "#39A334");
        }, (error) => {
            viewModal("hubo un error, intente más tarde", "error", "#F27474");
        });

        // funcion para retornar errores
        function viewModal( data, icon , style ){
            Swal.fire({
                html: `<h2 style="color: ${style}">${data}</h2>`,
                icon: `${icon}`,
                width: '40rem',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    })

});