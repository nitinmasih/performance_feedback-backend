import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Employee } from '../models/employeeModel.js';
import { configDotenv } from 'dotenv';
configDotenv()

const JWT_SECRET = process.env.JWT_SECRET; 
const JWT_EXPIRATION = '48h';
export const loginController = async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      
        const user = await Employee.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Generate a JWT token
            const token = jwt.sign(
                { id: user._id, role: user.role, name: user.name },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRATION }
            );

          
            res.status(200).json({ 
                message: 'Login successful!', 
                token,
                user: { id: user._id, role: user.role, name: user.name }
            });
        } else {
          
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        
        res.status(500).json({ message: 'Server error.' });
    }
};
