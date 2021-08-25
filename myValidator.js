$('document').ready(function(){
    // Expresión regular para validar los campos de nombre y apellidos

    var nameAndSurnamesRegExp = /^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/;

    $.validator.addMethod("validname", function( value, element ) {
        return this.optional( element ) || nameAndSurnamesRegExp.test( value );
    });

    // Expresion regular para validar el campo de tfno

    var phoneRegExp = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;

    $.validator.addMethod("validphone", function( value, element ) {
        return this.optional( element ) || phoneRegExp.test( value );
    });

    // Expresión regular para validar el campo de email

    var emailRegExp = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

    $.validator.addMethod("validemail", function( value, element ) {
        return this.optional( element ) || emailRegExp.test( value );
    });

    function mostrarRespuesta (responseText){	    
		$("#salida_form").append(responseText).fadeIn("slow"); // Utilizo la funcion append de JQuery para añadir el responseText dentro del div "salida_form"
    };

    $("#form").validate({
        rules:
        {
            nombre: {
                required: true,
                minlength: 3,
                validname: true
            },

            apellidos: {
                required: true,
                minlength: 3,
                validname: true
            },

            telefono : {
                required: true,
                validphone: true
            },

            email: {
                required: true,
                validemail: true
            },

            mensaje: {
                required: true,
                minlength: 20,
                maxlength: 300
            },
        },
        messages:
        {
            nombre: {
                required: "Debes introducir tu nombre",
                minlength: "El nombre escrito es demasiado corto",
                validname: "El nombre debe ir escrito la primera letra con mayúscula y además no puede tener carácteres especiales"
            },

            apellidos: {
                required: "Debes introducir tus apellidos",
                minlength: "Los apellidos escritos son demasiados cortos",
                validname: "Los apellidos deben ir escritos la primera letra con mayúscula y además no puede tener carácteres especiales"
            },

            telefono: {
                required: "Debes introducir tu teléfono",
                validphone: "Introduce un teléfono válido"
            },

            email: {
                required: "Por Favor, introduzca una dirección de correo electrónico",
                validemail: "Introduzca de forma adecuada su email"
            },

            mensaje: {
                required: "Escribe un mensaje",
                minlength: "El mensaje es demasiado corto",
                maxlength: "El mensaje supera los 300 carácteres"
            }
        },
        errorPlacement : function(error, element) {
            $(element).closest // Mas cercano 
            ('.form-group').find('.help-block').html(error.html());
        },
        submitHandler: function(form) {
            /*var url = $(this).attr('action');*/
		    var datos = $(form).serialize(); 

            $.ajax({
                type: "POST",
                url: "form.php",
                data: datos,
                //beforeSend: mostrarLoader,
			    success: mostrarRespuesta
            /*success: function(){
                alert('exito');
          }*/
        });
        }
    });
})