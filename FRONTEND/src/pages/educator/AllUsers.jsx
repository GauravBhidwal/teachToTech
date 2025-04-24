import React, { useState } from 'react';
import '../../assets/css/adminCSS/AllUsers.css';

const AllUsers = () => {
  const users = [
    {
      id: 1,
      firstName: 'Kesh',
      lastName: 'Kumar',
      email: 'kesh200@gmail.com',
      contact: '9170804968',
      qualification: 'B.Tech',
      dob: '2025-02-05',
      role: 'ADMIN'
    },
    {
      id: 2,
      firstName: 'Niharika',
      lastName: 'Choudhary',
      email: 'niharikac2324@gmail.com',
      contact: '9905454620',
      qualification: 'Btech',
      dob: '2005-03-31',
      role: 'USER'
    },
    {
      id: 3,
      firstName: 'Utkarsh',
      lastName: 'Upadhyay',
      email: 'utk.upa2004@gmail.com',
      contact: '9792187852',
      qualification: 'Intermediate',
      dob: '2004-12-31',
      role: 'USER'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('none'); // 'firstName' or 'sno'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'firstName') {
      return sortOrder === 'asc'
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName);
    } else if (sortBy === 'sno') {
      return sortOrder === 'asc'
        ? a.id - b.id
        : b.id - a.id;
    }
    return 0;
  });
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="all-users-container">
       <button type="button" className="back-button" onClick={handleBack}>← Back</button> 
      <div className="search-sort">
        <h2>All Users</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          className="search-allusers"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="sortby-allusers"
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSortBy(field);
            setSortOrder(order);
          }}
        >
          <option value="none-asc">Sort by</option>
          <option value="firstName-asc">Name A-Z</option>
          <option value="firstName-desc">Name Z-A</option>
          <option value="sno-asc">S.NO Ascending</option>
          <option value="sno-desc">S.NO Descending</option>
        </select>
      </div>

      <table className="table table-striped table-hover">
        <thead className="heading">
          <tr>
            <th>S.NO</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>CONTACT</th>
            <th>QUALIFICATION</th>
            <th>DATE OF BIRTH</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.qualification}</td>
              <td>{user.dob}</td>
              <td>{user.role}</td>
              <td>
                <button className="update-btn">Update</button>
                <button className="btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
