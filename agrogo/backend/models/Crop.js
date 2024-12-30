//schema
const cropSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
  });
  
  
  const userModel = mongoose.model("user", userSchema);
  