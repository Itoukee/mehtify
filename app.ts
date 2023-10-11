import cors from "cors";
import debug from "debug";
import express, { Request, Response } from "express";
import helmet from "helmet";
import http from "http";
import createError from "http-errors";
import logger from "morgan";
import musicRouter from "./routes/music.router";

interface IError extends Error {
  status: number;
  code: "EACCES" | "EADDRINUSE" | "ECONNREFUSED" | "ECONNRESET" | "ENOENT" | "ETIMEDOUT" | "EEXIST" | "EISDIR";
  message: string;
  stack: string;
  address: string;
  syscall?: string;
}

const port = 3000;
const app = express();

app.use(helmet()); // recommended to be done early
app.use(cors({ origin: "*" }));
app.use(logger("dev"));

app.use("/musics", musicRouter);

// error handler
app.use((err: IError, req: Request, res: Response, next: Function) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (typeof err === "string") return res.status(500).json({ status: 500, message: err });
  // render the error page
  return res.status(err.status || 500).json(err);
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next) => {
  next(createError(404));
});

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: IError) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);

    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);

    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  if (!addr) throw "No address";
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("backend:server")("Listening on " + bind);
};

const server = http.createServer(app);

server.listen(3000);
server.on("error", onError);
server.on("listening", onListening);
