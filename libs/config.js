import express from 'express';
import dotenv from 'dotenv';


export default function config(app) {
    app.use(express.json());

    const { error } = dotenv.config();
    if (error) {
        console.error("Error loading configuration from .env", error);
        process.exit(1); 
    }

    app.use((req, res, next) => {
        console.log("[REQ] " + req.method + " " + req.path);
        next();
    })
}




