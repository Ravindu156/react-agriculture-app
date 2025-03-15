const mongoose = require("mongoose");
const Article = require("./Article"); // Correct path to your model

// Connect to MongoDB
mongoose.connect("mongodb+srv://sanduni06nisansala:GXxRkwZRrQmkzQB2@agrogo.rbxzr.mongodb.net/AgroGo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateArticles() {
  try {
    const result = await Article.updateMany(
      { adminApproval: { $exists: false } }, // Find documents missing this field
      { $set: { adminApproval: false } } // Set default value
    );
    console.log(`Updated ${result.modifiedCount} articles successfully!`);
  } catch (error) {
    console.error("❌ Error updating articles:", error);
  } finally {
    mongoose.connection.close();
  }
}

updateArticles();
