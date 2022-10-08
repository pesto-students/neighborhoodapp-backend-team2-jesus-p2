import { readdirSync, readFileSync} from "fs";
import { readFile } from 'fs/promises';
import { basename, dirname } from "path";
import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath } from 'url';
//import database from "../config/Config.json";
const json = JSON.parse(await readFile(new URL('./../config/Config.json', import.meta.url)));
// let jsonData = JSON.parse(readFileSync("./../config/Config.json", 'utf-8'))
console.log("------------database", json.development);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = {};
const sequelize = new Sequelize(json.development);

const Database = async () => {
  const files = readdirSync(__dirname)
    .filter(
      (file) => file.indexOf('.') !== 0
      && file !== basename(__filename)
      && file.slice(-3) === '.js',
    );

  for await (const file of files) {
    const model = await import(`./${file}`);
    const namedModel = model.default(sequelize, DataTypes);
    db[namedModel.name] = namedModel;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
	console.log("----------DB----------", db);
  db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
  console.error('Unable to connect to the database:', err);
  });
  // return db;
};

export default Database;