import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!['user', 'manager', 'admin'].includes(role.toLowerCase())) {
      return toast.error('Invalid role! Please select user, manager, or admin.');
    }

    try {
      const request = await post('/api/auth/register', { name, email, password, department, role });
      const response = request.data;

      if (request.status === 200) {
        toast.success(response.message);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label htmlFor="department">Department</label>
            <input type="text" id="department" onChange={(e) => setDepartment(e.target.value)} placeholder="Enter your department" />
          </div>

          <div className="input-group">
            <label htmlFor="role">Role (User/Manager/Admin)</label>
            <input type="text" id="role" onChange={(e) => setRole(e.target.value)} placeholder="Enter role (e.g., user, manager, admin)" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </div>

          <button type="submit">Register</button>
          <p className="register-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </>
  );
}
