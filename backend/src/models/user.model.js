import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    accountType: {
      type: String,
      enum: ["Individual", "Organization"],
      required: true,
    },
    _orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations", // refers to the collection named 'organizations'
      required: function () {
        return this.accountType === "Organization"; // only required if accountType is Organization
      },
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
