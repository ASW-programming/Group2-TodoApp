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

app.get("/getTodos", async (req, res) => {
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

app.post("/addTodo", async (req, res) => {
	try {
		const todo = req.body;

		const docRef = await db.collection("Todos").add({
			title: todo.text,
			completed: false,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		});
		// newTodo
		const newTodo = {
			id: docRef.id,
			title: todo.text,
			completed: false,
		};
		console.log(todo);
		res.status(201).json({
			message: "Todo added!",
			todo: newTodo,
		});
	} catch (error) {
		console.error("Error adding todo:", error);
		res.status(500).json({ error: "Failed to add todo" });
	}
});

app.put("/updateTodos/:id", async (req, res) => {
	try {
		const todoID = req.params.id;
		const updates = req.body;

		const todoRef = db.collection("Todos").doc(todoID);
		await todoRef.set(updates, { merge: true });
		res.status(200).send("Update Succesfull");
	} catch (error) {
		console.log("Error updating todo");
		res.status(500).json({ error: "Something went wrong" });
	}
});

app.delete("/deleteTodos/:id", (req, res) => {
	const todoID = req.params.id;

	const todoRef = db.collection("Todos").doc(todoID).delete();

	res.status(200).send("Borttagen");
});

app.listen(PORT, () => {
	console.log(`Servern körs på http://localhost:${PORT}`);
});
