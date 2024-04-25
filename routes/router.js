import express from "express";
const router = express.Router();

import path from "path";
const __dirname = import.meta.dirname;

import {
  inicioSesionControl,
  dashboardControl,
} from "../controllers/agentController.js";

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/signIn", inicioSesionControl);
router.get("/dashboard", dashboardControl);

router.get("*", (req, res) => res.send("ruta no encontrada"));

export default router;
