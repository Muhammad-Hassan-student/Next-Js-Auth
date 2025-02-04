import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connection', () => {
            console.log("Mongo connected");
        });

        connection.on('error', (err) => {
            console.log("MongoDb connection error, please make sure db is up and running" + err);
            process.exit;
        })


    } catch (error) {
        console.log("Sonething went wrong in connecting to Db");
        console.log(error);
    }
}