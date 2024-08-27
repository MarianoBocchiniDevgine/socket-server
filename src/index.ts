import express from "express";
import http from "http";
import { startServer } from "./server";
import router from "./controllers";
import cors from "cors";
import { Server } from "socket.io";
import Products from "./models/products";

const app = express();

// Middleware de CORS global
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"], 
    credentials: true, 
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de tu aplicación
app.use(router);

const httpServer = http.createServer(app);

startServer(app, httpServer);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

// Escucha eventos de conexión en Socket.IO
io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  try {
    const products = await Products.findAll();
    console.log("Productos en la base de datos:", products);
    socket.emit("products", products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }

  //Acá se agrega el nuevo producto 
  socket.on("newProduct", async (newProduct) => {
    try {
      const product = await Products.create(newProduct); 
      io.emit("productAdded", product); 
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  });
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});
