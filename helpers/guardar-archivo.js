// const fs = require('fs');
import fs from 'fs';
const archivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    //console.log("DATA: ", data);

    // console.log(info);
    return data;
}

export { guardarDB, leerDB };