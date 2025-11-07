import React from 'react';
import type { User } from '../types/user.types';

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUserClick }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th className="d-none d-md-table-cell">Email</th>
            <th className="d-none d-lg-table-cell">Company</th>
            <th>City</th>
            <th className="d-none d-sm-table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => onUserClick(user)} style={{ cursor: 'pointer' }}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2 d-md-none" style={{ width: '30px', height: '30px' }}>
                    <i className="fas fa-user text-primary"></i>
                  </div>
                  <div>
                    <div>{user.name}</div>
                    <div className="d-md-none">
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </div>
                </div>
              </td>
              <td className="d-none d-md-table-cell">{user.email}</td>
              <td className="d-none d-lg-table-cell">{user.company.name}</td>
              <td>{user.address.city}</td>
              <td className="d-none d-sm-table-cell">
                <button className="btn btn-sm btn-outline-primary">
                  <i className="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;