import { v4 as uuidv4 } from 'uuid';

class Tarea {    //Tarea independiente
    id = ' ';
    desc = '';
    completadoEn = null;

constructor ( desc ){
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;
}
}

export { Tarea };