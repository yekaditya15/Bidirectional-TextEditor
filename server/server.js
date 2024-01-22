// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const morgan = require("morgan");
const Document = require("./Document");

// Load environment variables from .env file
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL, {});

// Set up Express app
const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("tiny"));

// Create HTTP server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Set up Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://text-editor-client.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      try {
        await saveDocument(documentId, data);
        socket.emit("save-success");
      } catch (error) {
        console.error("Error saving document:", error);
        socket.emit("save-error", "Error saving document");
      }
    });
  });
});

async function findOrCreateDocument(id) {
  if (!id) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}

async function saveDocument(id, data) {
  const document = await Document.findByIdAndUpdate(
    id,
    { data },
    { new: true, upsert: true }
  );

  if (!document) {
    // Document not found, handle accordingly (e.g., create a new document).
    // Example: await Document.create({ _id: id, data });
    throw new Error("Document not found");
  }
}
