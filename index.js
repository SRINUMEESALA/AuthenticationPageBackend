import express from "express";
import cors from "cors";
import connectToDb from "./src/DBConnections/RemoteAtlasDbCon.js";
import AuthenticationRoute from "./src/Routes/Authentication.js";

const port = process.env.PORT || 4000;
const app = express();
app.listen(port, () => {
  console.log(`Server successfully running at ${port}`);
});
connectToDb();

app.use(express.json());
app.use(cors());
app.use(AuthenticationRoute);
