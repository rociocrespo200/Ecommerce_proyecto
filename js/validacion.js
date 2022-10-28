//Crear array para almacenar a los usuarios registrados
const personas = [];

//Funcion constructora con los atributos que queremos almacenar
function Persona(nombre, apellido, email, usuario, contraseña) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.email = email;
  this.usuario = usuario;
  this.contraseña = contraseña;
}

//Usuario de prueba para comprobar verificaciones
personas[0] = new Persona(
  "Rocio",
  "Crespo",
  "rociocrespo200@gmail.com",
  "rocio200",
  "1234"
);

function registrarse() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var email = document.getElementById("email").value;
  var usuario = document.getElementById("usuario").value;
  var contraseña = document.getElementById("contraseña").value;
  var contraseñaV = document.getElementById("contraseñaV").value;


  //Validar que todos los campos se encuentren completos
  if (
    nombre == "" ||
    apellido == "" ||
    email == "" ||
    usuario == "" ||
    contraseña == "" ||
    contraseñaV == ""
  ) {
    document.getElementById("mensaje").innerHTML +=
      "Debes completar todos los datos para enviar el formulario <br>";
  } else if ( //Si todos los campos estan completos y se cumplen las verificaciones guardar el usuario
    validarEmail() == true &&
    validarContraseña() == true &&
    validarUsuario() == true
  ) {
    document.getElementById("mensaje").innerHTML +=
      "Ya se encuentra REGISTRADO<br>";
    personas[personas.length] = new Persona(
      nombre,
      apellido,
      email,
      usuario,
      contraseña
    );
  }
}

function validarEmail() {
  var email = document.getElementById("email").value;

  var validacion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (email != "") {
    //Comprobar el formato del email para que sea valido
    if (!validacion.test(email)) {
      document.getElementById("mensaje").innerHTML +=
        "El email ingresado NO es valido <br>";
      document.getElementById("email").style.border = "1px solid #FFAAAA";
      return false;
    } else { //Si es valido, recorrer el array personas para asegurarse de que el email no este registrado
      for (let i = 0; i < personas.length; i++) {
        if (email === personas[i].email) {
          document.getElementById("mensaje").innerHTML +=
            "Este email ya se encuentra registrado <br>";
          document.getElementById("email").style.border = "1px solid #FFAAAA";
          return false;
        } else {
          document.getElementById("mensaje").innerHTML =
            "El email ingresado es valido <br>";
          return true;
        }
      }
    }
  }
}

function validarContraseña() {
  var contraseña = document.getElementById("contraseña").value;
  var contraseñaV = document.getElementById("contraseñaV").value;
  var validacion = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  if (contraseña != "") {
    //Comprobar el formato de la contraseña para que sea valido (8 o mas caracteres, una mayuscula, una minuscula y un digito)
    if (!validacion.test(contraseña)) {
      document.getElementById("mensaje").innerHTML +=
        "La contraseña tiene que tener al menos 8 caracteres, una mayuscula, una minuscula y un digito <br>";
      document.getElementById("contraseña").style.border = "1px solid #FFAAAA";
      return false;
    } else if (contraseña != contraseñaV) { //Si es valido, comprobar que ambas contraseñas coincidan
      document.getElementById("mensaje").innerHTML +=
        "Las contraseñas NO coinciden <br>";
      document.getElementById("contraseñaV").style.border = "1px solid #FFAAAA";
      return false;
    } else {
      document.getElementById("mensaje").innerHTML +=
        "La contraseña se guardo con exito!!!<br>";
      return true;
    }
  }
}

function validarUsuario() {
  var usuario = document.getElementById("usuario").value;

  if (usuario != "") {
    for (let i = 0; i < personas.length; i++) {
      // Comprobar si el nombre ingresado tiene al menos 8 caracteres
      if (usuario.length < 8) { 
        document.getElementById("mensaje").innerHTML +=
          "El nombre de usuario debe contener al menos 8 caracteres <br>";
        document.getElementById("usuario").style.border = "1px solid #FFAAAA";
        return false;
      } else if (usuario === personas[i].usuario) { //Si es valido, recorrer array persona para asegurarse de que el usuario no este registrado
        document.getElementById("mensaje").innerHTML +=
          "El nombre de usuario NO esta disponible<br>";
        document.getElementById("usuario").style.border = "1px solid #FFAAAA";
        return false;
      } else {
        document.getElementById("mensaje").innerHTML += "Usuario VALIDO <br>";
        document.getElementById("usuario").style.border = "0px";
        return true;
      }
    }
  }
}

//Borrar mensajes cada vez que se toque el boton enviar, para que no se repitan
function borrarMensajes() {
  document.getElementById("mensaje").innerHTML = "";
}

// PAGINA INGRESAR

function ingresar() {
  var usuarioIngresar = document.getElementById("usuarioIngresar").value;
  var contraseñaIngresar = document.getElementById("contraseñaIngresar").value;

//Comprobar si el usuario se encuentra registrado
  if (usuarioIngresar != "" && contraseñaIngresar != "") {
    for (let i = 0; i < personas.length; i++) {
      if (
        usuarioIngresar == personas[i].usuario &&
        contraseñaIngresar == personas[i].contraseña
      ) {
        document.getElementById("mensaje").innerHTML += "Ingreso con exito!!";
      } else if ( //Comprobar si la controseña es correcta
        usuarioIngresar == personas[i].usuario &&
        contraseñaIngresar != personas[i].contraseña
      ) {
        document.getElementById("mensaje").innerHTML +=
          "La contraseña es incorrecta";
      } else {
        document.getElementById("mensaje").innerHTML +=
          "El nombre de usuario no se encuentra registrado";
      }
    }
  } else {
    document.getElementById("mensaje").innerHTML += "Complete todos los campos";
  }
}
