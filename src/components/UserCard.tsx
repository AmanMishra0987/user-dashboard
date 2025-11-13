import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user.types';

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const navigate = useNavigate();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-user/${user.id}`);
  };

  return (
    <div className="card h-100 shadow-sm" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
            <i className="fas fa-user text-primary fs-4"></i>
          </div>
          <div>
            <h5 className="card-title mb-0">{user.name}</h5>
            <p className="card-text text-muted mb-0 small">{user.username}</p>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="d-flex align-items-start">
            <i className="fas fa-envelope text-primary me-2 mt-1"></i>
            <span className="small text-break">{user.email}</span>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="d-flex align-items-start">
            <i className="fas fa-building text-primary me-2 mt-1"></i>
            <span className="small text-break">{user.company.name}</span>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="d-flex align-items-start">
            <i className="fas fa-city text-primary me-2 mt-1"></i>
            <span className="small text-break">{user.address.city}</span>
          </div>
        </div>
        
        <div className="mt-auto d-flex gap-2">
          <button 
            className="btn btn-outline-primary btn-sm flex-fill"
            onClick={onClick}
          >
            <i className="fas fa-eye me-1"></i>
            View
          </button>
          <button 
            className="btn btn-outline-warning btn-sm"
            onClick={handleEditClick}
            title="Edit User"
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;