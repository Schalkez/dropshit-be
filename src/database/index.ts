import mongoose from "mongoose";
import { db } from "../config";

// Build the connection string
// const dbURI = `mongodb://${db.host}:${db.port}/${db.name}`;
const dbURI = `mongodb+srv://mynameishieenf:root@dropshit.hieq8.mongodb.net/${db.name}`;

console.log(dbURI);

const options: mongoose.ConnectOptions = {
  autoIndex: true,
  minPoolSize: db.minPoolSize, // Maintain up to x socket connections
  maxPoolSize: db.maxPoolSize, // Maintain up to x socket connections
  connectTimeoutMS: 120000, // Give up initial connection after x seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

function setRunValidators() {
  this.setOptions({ runValidators: true });
}

// Create the database connection
mongoose
  .plugin((schema: any) => {
    schema.pre("findOneAndUpdate", setRunValidators);
    schema.pre("updateMany", setRunValidators);
    schema.pre("updateOne", setRunValidators);
    schema.pre("update", setRunValidators);
  })
  .connect(dbURI, options)
  .then(() => {
    console.log("Mongoose connection done");
  })
  .catch((e) => {
    console.log("Mongoose connection error");
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open to " + dbURI);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

export const connection = mongoose.connection;
