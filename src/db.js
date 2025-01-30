import Dexie from "dexie";

const db = new Dexie("MyDatabase");

db.version(1).stores({
  images: "id,data",
  project: "id,image,name,date,rgb,filter",
});

export default db;
