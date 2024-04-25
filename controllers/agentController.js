import jwt from "jsonwebtoken";
import { agents } from "../data/agentes.js";
process.loadEnvFile();

const secretKey = process.env.SECRET_KEY;

const inicioSesionControl = (req, res) => {
  try {
    const { email, password } = req.query;
    const agent = agents.find((agent) => {
      return agent.email === email && agent.password === password;
    });
    let token = jwt.sign({ email }, secretKey, { expiresIn: "2m" });
    //sessionStorage.setItem guarda el token en el storage, lo podemos ver en devtools/storage
    agent
      ? res.send(`<p> Agente autenticado, bienvenido <b>${email}</b>
    Su token está en el sessionStorage </p>
    <a href="/dashboard?token=${token}"> Ir al Dashboard</a>
    <script>
      sessionStorage.setItem('token', JSON.stringify("${token}"))
    </script>`)
      : res.send("usuario o contrasena Incorrecta!");
  } catch (error) {
    console.log(error);
  }
};

const dashboardControl = (req, res) => {
  try {
    const { token } = req.query;
    jwt.verify(token, secretKey, (error, data) => {
      if (error) {
        res.status(401).send(`falla en la verificacion ${error.message}`);
      } else {
        res.send(`bienvenido al dashboard ${data.email}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { inicioSesionControl, dashboardControl };
