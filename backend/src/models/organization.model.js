import mongoose from "mongoose";

const organizationSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;
