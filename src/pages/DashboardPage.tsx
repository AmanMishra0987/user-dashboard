import React, { useState, useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import UserDetailModal from '../components/UserDetailModal';
import type { User } from '../types/user.types';

const DashboardPage: React.FC = () => {
  const { users, loading, error, fetchUsers } = useUsers();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  if (loading && users.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUsers} />;
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <h1 className="mb-0">
              <i className="fas fa-users me-2"></i>
              User Dashboard
            </h1>
            <a href="/add-user" className="btn btn-success w-100 w-md-auto">
              <i className="fas fa-plus me-1"></i>
              Add New User
            </a>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="dashboard-header">
                <div className="controls mb-4">
                  <div className="mb-3">
                    <SearchBar onSearch={handleSearch} />
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <div className="view-toggle btn-group w-100 w-sm-auto" role="group">
                      <button 
                        type="button"
                        className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setViewMode('table')}
                      >
                        <i className="fas fa-table me-1"></i>
                        <span className="d-none d-sm-inline">Table View</span>
                        <span className="d-inline d-sm-none">Table</span>
                      </button>
                      <button 
                        type="button"
                        className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setViewMode('grid')}
                      >
                        <i className="fas fa-th-large me-1"></i>
                        <span className="d-none d-sm-inline">Grid View</span>
                        <span className="d-inline d-sm-none">Grid</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {loading && users.length > 0 && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75">
                  <LoadingSpinner message="Updating..." />
                </div>
              )}
              
              <div className="user-list">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-users-slash fa-3x text-muted mb-3"></i>
                    <p className="text-muted">No users found.</p>
                  </div>
                ) : viewMode === 'table' ? (
                  <div className="table-responsive">
                    <UserTable users={filteredUsers} onUserClick={handleUserClick} />
                  </div>
                ) : (
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    {filteredUsers.map((user) => (
                      <div className="col" key={user.id}>
                        <UserCard 
                          user={user} 
                          onClick={() => handleUserClick(user)} 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default DashboardPage;