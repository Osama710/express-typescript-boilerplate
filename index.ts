import app from "./express-config";
import RouteRegistrar from "./src/routes";

const routeRegistrar = new RouteRegistrar(app);
routeRegistrar.registerRoutes();

const port: number = Number(process.env.PORT) || 3000;
const host: string = process.env.HOST || "localhost";

app.listen(port, host, (err?: Error) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log(`Server is listening on http://${host}:${port}`);
});
