const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://gokulkrishnan072:gokul2711@gokulcluster.053ni6q.mongodb.net/webscrape?retryWrites=true&w=majority");
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;