const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoURI = "mongodb://localhost:27017";

// Old method of connecting to MongoDB (deprecated)
// But, also works for previous versions of MongoDB
// const connectToMongo = () => {
//   mongoose.connect(mongoURI, () => {
//     console.log("Connected to Mongo successfully");
//   });
// };

// module.exports = connectToMongo;

// New method of connecting to MongoDB (currently used)
const server = "127.0.0.1:27017"; // REPLACE WITH YOUR DB SERVER
const database = "test"; // REPLACE WITH YOUR DB NAME

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${server}/${database}`, {
      useNewUrlParser: true,
    });
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
