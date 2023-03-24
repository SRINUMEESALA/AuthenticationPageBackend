import mongoose from "mongoose";

let db;
const connectToDb = async () => {
  let URI =
    "mongodb+srv://SrinuMeesala:RadheKrishn@cluster0.peq6rhc.mongodb.net/DatabaseOne?retryWrites=true&w=majority";
  try {
    db = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Unable to connect DB");
  }
};
export default connectToDb;
