import { Router } from "express";
import Author from "../models/authors.model.js";

// Creiamo un nuovo Router 
const authorRoute = Router();

// Richiesta GET generica
authorRoute.get("/", async (req, res) => {
    try {
        // mandiamo una risposta con tutta la lista degli attori
        const authors = await Author.find();
        res.send(authors);
    } catch (err) {
        console.error(err);
    }
});

// Richiesta GET di un'attore specifico
authorRoute.get("/:id", async (req, res) => {
    try {
        // cercare l'autore richiesto
        let author = await Author.findById(req.params.id);
        // mandare la risposta
        if (author) {
            res.send(author);
        } else {
            res.status(404).send("Author not found");
        }
    } catch (err) {
        console.error(err);
    }
});

// Richiesta POST
authorRoute.post("/", async (req, res) => {
    try {
        // creare l'autore
        let author = await Author.create(req.body);
        // mandare la risposta
        res.send(author);
    } catch (err) {
        console.error(err)
    }
})

// Richiesta PUT
authorRoute.put("/:id", async (req, res) => {
    try {
        // eseguire la modifica
        let author = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        // mandare la risposta
        if (author) {
            res.send(author);
        } else {
            res.status(404).send("Author not found");
        }
    } catch (err) {
        console.error(err);
    }
})

// Richiesta DELETE
authorRoute.delete("/:id", async (req, res) => {
    try {
        // controllare se l'id è valido
        let author = await Author.findByIdAndUpdate(req.params.id);
        if (author) {

            // cancellare l'oggetto se l'id è valido
            await Author.deleteOne({
                _id: req.params.id
            })
            res.send("object deleted");
        } else {
            // se l'id non è valido
            res.status(404).send("Author not found");
        }
    } catch (err) {
        console.error(err)
    }
})

// Export
export default authorRoute;