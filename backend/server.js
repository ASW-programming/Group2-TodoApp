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

app.get("/todos", async (req, res) => {
	try {
		const todoCollection = db.collection("Todos");
		const snapshot = await todoCollection.get();

		if (snapshot.empty) {
			return res.status(200).json([]);
		}

		let todos = [];

		snapshot.forEach((doc) => {
			todos.push({
				id: doc.id,
				...doc.data(),
			});
		});
		res.status(200).json(todos);
	} catch (error) {
		res.status(500).send("Något gick fel");
	}
});

app.post("/addTodo", (req, res) => {
	const todo = req.body;
	console.log(todo);

	res.status(201).json({
		message: "Todo added",
		todo: todo,
	});
});

app.listen(PORT, () => {
	console.log(`Servern körs på http://localhost:${PORT}`);
});
