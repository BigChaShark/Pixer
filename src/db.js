import Dexie from "dexie";

// ✅ สร้างฐานข้อมูล
const db = new Dexie("MyDatabase");

// ✅ สร้าง Table (object store)
db.version(1).stores({
  images: "id,data",
  project: "id,image,name,date,rgb,filter",
});

export default db;
