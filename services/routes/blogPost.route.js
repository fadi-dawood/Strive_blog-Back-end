import blogPost from "../models/blogPost.model.js";
import { Router } from "express";

// creare una rotta:
const blogPostRouter = Router();

blogPostRouter.get("/", async (req, res) => {
    try {
        // mandiamo una risposta con tutta la lista degli attori
        const Posts = await blogPost.find();
        res.send(Posts);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

blogPostRouter.get("/:id", async (req, res) => {
    try {
        const post = await blogPost.findById(req.params.id);
        post ? res.send(post) : res.send("Invalid ID");
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

blogPostRouter.post("/", async (req, res) => {
    try {
        const post = await blogPost.create(req.body);
        res.send(post);
    } catch (err) {
        console.error(err);
    }
})

blogPostRouter.put("/:id", async (req, res) => {
    try {
        const post = await blogPost.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(post);
    } catch (err) {
        console.error(err);
    }
})

blogPostRouter.delete("/:id", async (req, res) => {
    try {
        let post = req.params.id;
        if (post) {
            await blogPost.findByIdAndDelete(post);
            res.send("post deleted");
        } else{
            res.send("Invali ID"); 
        }
    } catch (err) {
        console.error(err);
    }
})

export default blogPostRouter;