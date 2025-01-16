import mongoose from "mongoose";
import { db } from "../config";

// Build the connection string
// const dbURI = `mongodb://${db.host}:${db.port}/${db.name}`;
const MONGO_URI = `mongodb+srv://mynameishieenf:root@dropshit.hieq8.mongodb.net/${db.name}`;
// `mongodb+srv://mynameishieenf:root@dropshit.hieq8.mongodb.net/${db.name}`;

console.log(MONGO_URI);

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
  .connect(MONGO_URI, options)
  .then(() => {
    console.log("Mongoose connection done");
  })
  .catch((e) => {
    console.log("Mongoose connection error");
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open to " + MONGO_URI);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

export const connection = mongoose.connection;
