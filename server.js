import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import authorRoute from './services/routes/author.route.js';
import blogPostRouter from "./services/routes/blogPost.route.js";

// caricare le variabili da .env
config();

// creare un'applicazione express chiamata app (creazione server)
const app = express();

//definire la porta
const PORT = 3000;

// comunicazioni in json
app.use(express.json());

// Importa routes:
// http/localhost:3000/authors
app.use("/authors", authorRoute);
// http/localhost:3000/blogPost
app.use("/blogPost", blogPostRouter);


// Funzione per inizializzare il server
const inittserver = async () => {
    try {
        // Aspettiamo di connetterci al database
        await mongoose.connect(process.env.dbconnection);

        // Abilita server
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}

// Invochiamo la funzione per inizializzare il server
inittserver();

