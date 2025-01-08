import React, { useEffect, useState } from 'react';
import { deleteUser, get } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [users, setUsers] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const GetUsers = async () => {
      try {
        const request = await get('/api/manager/getuser');
        const response = request.data;
        if (request.status === 200) {
          setUsers(response.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetUsers();
  }, []);

  

  return (
    <>
      <div>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
      <div>
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>              
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((elem, index) => (
                <tr key={index}>
                  <td>{elem.name}</td>
                  <td>{elem.email}</td>
                  <td>{elem.department}</td>
                  <td>{elem.role}</td>                  
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
