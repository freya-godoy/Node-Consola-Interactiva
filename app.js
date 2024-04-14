import colors from 'colors';
import { guardarDB, leerDB } from "./helpers/guardar-archivo.js";
import { inquirerMenu, pausa, leerInput } from './helpers/inquirer.js';
import { listadoTareasBorrar } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js'
import { confirmar } from './helpers/inquirer.js';
import { mostrarListadoChecklist } from './helpers/inquirer.js';

//console.clear();

const main = async () => {

    // console.log('Hola-Mundo');

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    // console.log("tareasDB: ", tareasDB);

    if (tareasDB) {//cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //Esta funcion imprime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;
            case '3': //Listar completados
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': //Listar pendientes 
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': //Completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': //Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('Estas seguro?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada!');
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();