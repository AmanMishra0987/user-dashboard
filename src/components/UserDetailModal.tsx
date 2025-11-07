import React from 'react';
import type { User } from '../types/user.types';

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fas fa-user me-2"></i>
              {user.name}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-user text-primary fs-3"></i>
                  </div>
                  <div>
                    <h5 className="mb-0">{user.name}</h5>
                    <small className="text-muted">{user.username}</small>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-envelope text-primary me-3 fs-5"></i>
                    <div>
                      
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-phone text-primary me-3 fs-5"></i>
                    <div>
                      
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-globe text-primary me-3 fs-5"></i>
                    <div>
                     
                      <span>{user.website}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6">
                <div className="card bg-light border-0 mb-3">
                  <div className="card-body">
                    <h6 className="card-title text-primary">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      Address
                    </h6>
                    <p className="card-text mb-1">{user.address.street}, {user.address.suite}</p>
                    <p className="card-text mb-1">{user.address.city}, {user.address.zipcode}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                      </small>
                    </p>
                  </div>
                </div>
                
                <div className="card bg-light border-0">
                  <div className="card-body">
                    <h6 className="card-title text-primary">
                      <i className="fas fa-building me-2"></i>
                      Company
                    </h6>
                    <p className="card-text mb-1 fw-bold">{user.company.name}</p>
                    <p className="card-text mb-1"><small>"{user.company.catchPhrase}"</small></p>
                    <p className="card-text"><small className="text-muted">{user.company.bs}</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-light">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <i className="fas fa-times me-1"></i>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;