import express from "express";
import path from "path";
import process from "process";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, query } = req.body;
      
      if (!name || !email || !query) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // If SMTP is not fully configured, return a mock success
      // to not break the frontend for viewers who haven't set up SMTP.
      if (!process.env.SMTP_PASS) {
        console.warn("SMTP_PASS is not configured. Simulating email sending.");
        return res.json({ success: true, mocked: true });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: "techaics@gmail.com",
        replyTo: email,
        subject: `New Query from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${query}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong></p>
               <p>${query.replace(/\\n/g, '<br>')}</p>`,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
