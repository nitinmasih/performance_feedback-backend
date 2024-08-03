import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  position:{
    type:String,
    required:true
  },
  role: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const Employee = mongoose.model("Employee", employeeSchema);
