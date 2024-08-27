import http from "http";
import { AddressInfo } from "net";
import express from "express";
import syncModels from "./models/sync";

export async function startServer(
  app: express.Application,
  httpServer: http.Server
) {
  try {
    await syncModels();

    const PORT = 4000;

    httpServer.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor ejecutando en el puerto ${PORT}`);
      const address = httpServer.address() as AddressInfo;

      if (address) {
        const addr = address.address;
        console.log("address => ", address);
        console.log(`Server running at: http://${addr}:${PORT}`);
      }
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}
