import mongoose from "mongoose";
import "mongoose-type-email";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

// userSchema.pre("save", function (next) {
//   if (this.isModified("password")) {
//     this.password = bcrypt.hashSync(this.password, 10);
//   }
//   next();
// });

// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

// const encryptedPassword = bcrypt.hash(password, 10);

const User = mongoose.model("User", userSchema);
export default User;
