import inquirer from 'inquirer';
import 'colors';

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listas de tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5.  Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]

    }
];


const inquirerMenu = async () => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione un opcion'.white);
    console.log('=========================\n'.green);

    const { option } = await inquirer.prompt(menuOpts);

    return option;
}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return ' Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}


const listadoTareasBorrar = async (Tareas = []) => {


    const choices = Tareas.map((Tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: Tarea.id,
            name: `${idx} ${Tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar' //Para cancelar la opcion elegida 
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (Tareas = []) => {


    const choices = Tareas.map((Tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: Tarea.id,
            name: `${idx} ${Tarea.desc}`,
            checked: (Tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist };