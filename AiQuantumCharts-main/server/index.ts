import express from "express";
import cors from "cors";
import pairs from "./api/pairs";
import prices from "./api/prices";
import chat from "./api/chat";
import ai from "./api/ai";
import legalAPI from "./legal/LegalAPI";
import shield from "./security/QuantumShield";
import languageBridge, { attachBridge } from "./bridge/LanguageBridge";
const emailOAuth = require("./emailOAuth");

const app = express();
app.use(cors());
app.use(express.json());

// attach the Multilingual Code Bridge
attachBridge(app);
app.use(languageBridge);

// now all downstream routes read canonical English

app.use("/auth", emailOAuth);
app.use("/api/pairs", pairs);
app.use("/api/prices", prices);
app.use("/api/chat", chat);
app.use("/api/ai", ai);
app.use("/", legalAPI);
app.use("/", shield);

const PORT = 3000;
app.listen(PORT, () => console.log("🧠 Quantum Bridge active on port 3000"));
