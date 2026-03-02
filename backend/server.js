import admin from "firebase-admin";
import express from "express";
import cors from "cors";

import { serviceAccount } from "../serviceAccountKey.js";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

// Skapa referens till firestore-db
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.post("/addTodo", (req, res)=> {
    const todo = req.body;
   console.log (todo);

   res.status(201).json({
    message: "Todo added",
    todo: todo
   });
    })

app.listen(PORT, () => {
	console.log(`Servern körs på http://localhost:${PORT}`);
});
