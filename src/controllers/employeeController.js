import { Employee } from '../models/employeeModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv()
// Controller function to add an employee
export const addEmployee = async (req, res) => {
  try {
    const { name, email, password, role, position } = req.body;

    if (!name || !email || !password || !role || !position) {
          return res.status(400).json({ message: 'All fields are required' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
          return res.status(400).json({ message: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({ name, email, password: hashedPassword, role, position });

    await newEmployee.save();

    const token = jwt.sign(
          { id: newEmployee._id, role: newEmployee.role },
          process.env.JWT_SECRET,
          { expiresIn: '48h' }
    );
 
    res.status(201).json({ 
          message: 'Employee created successfully', 
          employee: newEmployee,
          token 
    });
} catch (error) {

    res.status(500).json({ message: 'Server error' });
}
};
// Controller function to get an all employees 
export const getAllEmployees = async (req ,res) => {

      try {
            const employees = await Employee.find({})
            res.status(201).json({ message: "Employees data fetched", employees })
        
      } catch (error) {
            res.status(404).json({
                  message: "Could found data",
                  error
            })
      
      }

}

// Controller function to get an employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    
    const { id } = req.params;

    

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {

    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to update an employee by ID
export const updateEmployee = async (req, res) => {
  try {
    
    const { id } = req.params;
    const updateData = req.body;


    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData);

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {


  
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    res.status(500).json({ message: 'Server error' });
  }
};



// Controller function to delete an employee by ID
export const deleteEmployee = async (req, res) => {
  try {

    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {

    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    res.status(500).json({ message: 'Server error' });
  }
};
