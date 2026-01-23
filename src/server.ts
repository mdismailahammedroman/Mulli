import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { EnvVars } from "./app/config/EnvVars";
import { seedSuperAdmin } from "./utils/SeedSuperAdmin";

const PORT = EnvVars.PORT || 3000;

// Create HTTP server from Express app
const server = http.createServer(app);

// Create Socket.IO server
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("geolocation", (data) => {
    console.log("Received geolocation:", data);
    socket.broadcast.emit("geolocation", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const startServer = async () => {
  try {
    // Start server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server or seed super admin:", error);
    process.exit(1);
  }
};

// Shutdown handler
const shutdown = (signal?: string, error?: any) => {
  console.log(`${signal || "Shutdown"} received. Closing server...`, error);
  server.close(() => {
    console.log("Server closed");
    process.exit(1);
  });
};

// Use an IIFE to start the server and seed super admin
(async () => {
  await startServer();
  await seedSuperAdmin();
})();

process.on("SIGTERM", (error) => {
  console.log("SIGTERM received...........Server shutting down", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGINT", (error) => {
  console.log("SIGINT  received...........Server shutting down", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("unhandledRejection", (error) => {
  console.log(
    "unhandledRejection  received...........Server shutting down",
    error,
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", (error) => {
  console.log(
    "unhandledRejection  received...........Server shutting down",
    error,
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
