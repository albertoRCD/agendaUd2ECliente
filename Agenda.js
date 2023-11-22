
/* Clase contacto, obligatorios dni y nombre, el resto de campos se pueden poner o no, 
    por defecto tendrán "Sin datos". */

class Contacto  {

    constructor (dni, nombre, apellido1, apellido2, telefono, email ){
        this.dni = dni;
        this.nombre = nombre;
        this.apellido1 = apellido1 || "Sin datos.";
        this.apellido2 = apellido2 || "Sin datos.";
        this.telefono = telefono || "Sin datos.";
        this.email = email || "Sin datos.";
    }

}

//Array de la agenda de Contactos, le puse 2 contactos para hacer las comprobaciones.
let agendaContactos = [new Contacto("11111111M","Alberto"), new Contacto("10101010Z","Alberto")];


//---------------------FUNCIÓN DE FLECHA PARA GESTIONAR LA OPERACIÓN A REALIZAR-----------------------
const opcionARealizar = () => {
        opcion = prompt("Opción a realizar: ");

    return opcion;
}


//---------------------- OPCIÓN 1. FUNCIÓN DE FLECHA DE ALTA DE CONTACTO.-----------------------------
const altaContacto = () => {

    let dni = "";
    let nombre = "";
    let dniRegistrado = false;

    /* // Como el campo dni y nombre son obligatorios, 
     les añado un do while con una condición de longitud. */
    do {
        dni = prompt("--CAMPO OBLIGATORIO-- \n DNI: ");
         // Compruebo que no exista un dni ya registrado en la agenda.
        dniRegistrado = agendaContactos.some(contacto => contacto.dni === dni); 
            if(dniRegistrado) alert("El DNI ya existe en la agenda.");
    } while(dni.length < 8 || dniRegistrado);  

    do {
        nombre = prompt("--CAMPO OBLIGATORIO-- \n Nombre: ");
    } while(nombre.length < 3);

    let apellido1 = prompt("Primer Apellido: ");
    let apellido2 = prompt("Segundo Apellido: ");
    let telefonoValido = false;
    let telefono = prompt("Teléfono: ");
    if(telefono.length > 0){
        do  {
        telefono = prompt("Teléfono: ");
        //Compruebo con un regex, si el teléfono contiene números.
        /^[0-9]+$/.test(telefono) ? telefonoValido = true : telefono = false; 
        } while(!telefonoValido);
    }

    let email = prompt("Email: ");

   

    /*  Si llega a este punto, quiere decir que el dni no está duplicado y es válido, así
            que creamos el contacto nuevo y lo agregamos a la agenda.  */

        agendaContactos.push(new Contacto(dni, nombre, apellido1, apellido2, telefono, email));
        alert("Contacto agregado correctamente.")

}

//---------------- OPCIÓN 2. FUNCIÓN DE FLECHA DE BORRAR CONTACTO.------------------------------
const borrarContacto = () => {

    let dniABorrar = prompt("DNI del contacto para eliminar: ");
    let encontrado = false;

    /* Recorro el array en busca del contacto con el dni proporcionado,
        si lo encuentra, lo elimino con splice */

    for(let i=0; i<agendaContactos.length; i++){
        if(agendaContactos[i].dni == dniABorrar){
            agendaContactos.splice(i,1);
            encontrado = true;
        }
    }

    /*Con un ternario compruebo si se ha encontrado el contacto e
     informo con un alert de la acción que se ha realizado.*/

    encontrado ? alert("Contacto eliminado correctamente!") :
                 alert("No se ha encontrado el contacto con el dni proporcionado. ");
}

//---------------- OPCIÓN 3. FUNCIÓN DE FLECHA DE MODIFICACIÓN DE CONTACTO.------------------------------

const modificarContacto = () => {

    let dniEncontrado = false;
    let dniAModificar = prompt("DNI del contacto a modificar: ");
    for(let i=0; i<agendaContactos.length; i++){
        if(agendaContactos[i].dni == dniAModificar){
            dniEncontrado = true;
            let nombreNuevo = "";
            do {
                nombreNuevo = prompt("Contacto con DNI (no modificable) : " + agendaContactos[i].dni +
                "\nNombre anterior: " + agendaContactos[i].nombre + 
                "\nNombre nuevo: " );
            } while(nombreNuevo.length < 3);
            agendaContactos[i].nombre = nombreNuevo;
            let apellido1Nuevo = prompt("Contacto con DNI (no modificable) : " + agendaContactos[i].dni +
            "\nPrimer apellido anterior: " + agendaContactos[i].apellido1 + 
            "\nPrimer apellido nuevo: " );
            agendaContactos[i].apellido1 = apellido1Nuevo;
            let apellido2Nuevo = prompt("Contacto con DNI (no modificable) : " + agendaContactos[i].dni +
            "\nSegundo apellido anterior: " + agendaContactos[i].apellido2 + 
            "\nSegundo apellido nuevo: " );
            agendaContactos[i].apellido2 = apellido2Nuevo;
            let telefonoNuevo = prompt("Contacto con DNI (no modificable) : " + agendaContactos[i].dni +
            "\nTeléfono anterior: " + agendaContactos[i].telefono + 
            "\nTeléfono nuevo: " );
            agendaContactos[i].telefono = telefonoNuevo;
            let emailNuevo = prompt("Contacto con DNI (no modificable) : " + agendaContactos[i].dni +
            "\nEmail anterior: " + agendaContactos[i].email + 
            "\nEmail nuevo: " );
            agendaContactos[i].email = emailNuevo;
        }
    } 

    if(dniEncontrado == false){
        alert("No existe ningún contacto con el dni proporcionado.");
    }
}

//---------------- OPCIÓN 4. FUNCIÓN DE FLECHA DE BÚSQUEDA DE CONTACTO POR DNI.------------------------------

const busquedaContactoPorDni = () => {

    let dniABuscar = prompt("DNI del contacto a buscar: ");
    
    /* En esta ocasión, en vez de hacer un for para buscar el contacto, cambio la forma de búsqueda por un
        filter para que me filtre el contacto por el que tenga el dni solicitado y después compruebo si 
        se encontró, como solo puede existir 1 con ese mismo DNI, utilizo un .length del resultado obtenido en el filter
        y con un ternario hago la comprobación de si fue encontrado o no y muestro el resultado en forma de altert, si existe muestro los datos
        recorriendolo con un map */

        agendaContactos.filter(contacto => contacto.dni === dniABuscar).length == 1 

                ?

                alert(agendaContactos.filter(contacto => contacto.dni === dniABuscar).map(contacto => "DNI: "+ contacto.dni + "\n" + 
                    "Nombre: " + contacto.nombre + "\n" + "Primer Apellido: "+ contacto.apellido1 + "\n" + "Segundo apellido: "+ 
                    contacto.apellido2 + "\n" + "Teléfono: "+ contacto.telefono + "\n" + "Email: "+ contacto.email))

                :

                alert("Contacto no encontrado.");

}

//---------------- OPCIÓN 5. FUNCIÓN DE FLECHA DE BÚSQUEDA DE CONTACTO POR NOMBRE.------------------------------

const busquedaContactosPorNombre = () => {

    let nombreABuscar = prompt("Nombre a buscar: ");

        /*Muy parecida a la anterior función, solo cambio que en la comprobación si hay 0 resultados muestra el primer alert,
        y después muestra todos los resultados encontrados, si hay más de un contacto con el mismo nombre los mostrará */

        agendaContactos.filter(contacto => contacto.nombre === nombreABuscar).length == 0

        ?

        alert("Contacto no encontrado.")

        :

        alert(agendaContactos.filter(contacto => contacto.nombre === nombreABuscar).map(contacto => "DNI: "+ contacto.dni + "\n" + 
        "Nombre: " + contacto.nombre + "\n" + "Primer Apellido: "+ contacto.apellido1 + "\n" + "Segundo apellido: "+ 
        contacto.apellido2 + "\n" + "Teléfono: "+ contacto.telefono + "\n" + "Email: "+ contacto.email  + "\n ------- \n" ));

}

//---------------- OPCIÓN 6. FUNCIÓN DE FLECHA BORRAR AGENDA.------------------------------

const borrarAgenda = () => {

    /* Utilizo un confirm en vez de un prompt para que el usuario pueda confirmar una acción importante como
        es la de borrado, guardo el resultado en la variable borrar, y con el operador && ternario,
        hago la comprobación de que si borrar es verdadero (Se pulsó Aceptar), entonces borro los elementos de la agenda
        con un splice, y si pulsa 'Cancelar' no se hace nada, de ahí el '&&'. */

    let borrar = confirm("Estás a punto de eliminar la agenda por completo... ¿estás seguro?");

    borrar && agendaContactos.splice(0, agendaContactos.length);

}


//---------------- OPCIÓN 7. FUNCIÓN DE FLECHA DE INFORMACIÓN DE LA AGENDA.------------------------------

const mostrarInformacion = () => {

    let numeroRegistros = agendaContactos.length;
    //Como el valor por defecto es 'Sin datos.', hago la comprobación de cuantos contactos lo tienen,
        //porque eso quiere decir que no tienen teléfono registrado.
    let contactosSinTelefono = agendaContactos.filter(contacto => contacto.telefono == "Sin datos.").length;

    alert(`Número total de registros en la agenda: ${numeroRegistros}\n
    Número total de registros sin teléfono: ${contactosSinTelefono}`);
}
