const { default: async } = require("async");
const express = require("express");
const { db } = require("./firebase/admin");

const app = express();

const PORT = 3000;

app.use(express.json());

// Welcome route
app.get("/api", (req, res) => {
    res.status(200).send({
        message: "Welcome to IDEALIZE 2023 REST API...",
    });
});

// Get all sessions
app.get("/api/sessions", async (req, res) => {
    const sessionRef = db.collection("sessions");

    sessionRef
        .get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return res.status(201).json(data);
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Error while getting sessions.",
                error: error,
            });
        });
});

// Get specific session
app.get("/api/sessions/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const sessionRef = db.collection("sessions").where("id", "==", id);

    sessionRef
        .get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            if (data.length === 0) {
                return res.status(404).json({
                    message: `No session found for the given session id: ${id}.`,
                });
            }

            return res.status(201).json(data);
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Error while getting session.",
                error: error,
            });
        });
});

// Add a sessions
app.post("/api/sessions", async (req, res) => {
    const sessionRef = db.collection("sessions");
    const snapshot = await sessionRef.count().get();
    const docId = snapshot.data().count + 1;

    const session = {
        id: docId,
        ...req.body,
    };

    sessionRef
        .doc(docId.toString())
        .set(session)
        .then((docRef) => {
            return res.status(201).json({
                id: docRef.id,
                ...session,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Error while adding session.",
                error: error,
            });
        });
});

// Update a session
app.put("/api/sessions/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedSession = req.body;

    const sessionDocRef = db.collection("sessions").doc(id.toString());

        sessionDocRef.get().then((doc) => {
            if (doc.exists) {
                sessionDocRef
                    .update(updatedSession)
                    .then(() => {
                        return res.status(201).json({
                            id: doc.id,
                            ...updatedSession,
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: "Error while updating session.",
                        });
                    });
            } else {
                return res.status(404).json({
                    message: `No session found for the given session id: ${id}.`,
                });
            }
        }).catch((error) => {
          console.log(error);
            return res.status(500).json({
                message: "Error while getting the session to update.",
                error: error
            });
        });
});

app.delete("/api/sessions/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const sessionDocRef = db.collection("sessions").doc(id.toString());

    sessionDocRef.get().then((doc) => {
        if (doc.exists) {
            sessionDocRef.delete().then(() => {
                return res.status(201).json({
                    message: `Session with id ${id} deleted successfully.`,
                });
            });
        } else {
            return res.status(404).json({
                message: `No session found for the given session id: ${id}.`,
            });
        }
    }).catch((error) => {
        return res.status(500).json({
            message: "Error while getting the session to delete.",
            error: error
        });
    });
});

app.listen(PORT, () => {
    console.log(`The server has started on port ${PORT}...`);
});
