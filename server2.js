const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// เพิ่ม middleware สำหรับ CORS
server.use(
  cors({
    origin: "*", // หรือกำหนด origin เป็น URL ของ Vercel เช่น 'https://your-vercel-domain.vercel.app'
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
const PORT2 = process.env.PORT || 3002;
server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT2}`);
});
