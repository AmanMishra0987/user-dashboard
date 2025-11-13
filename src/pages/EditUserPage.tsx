import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useUser } from "../hooks/useUser";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import type { User } from "../types/user.types";

const EditUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : 0;
  const { user, loading: loadingUser, error: userError, fetchUser } = useUser();
  const { loading, error, success, updateUser, reset } = useUpdateUser();

  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId, fetchUser]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        address: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
          geo: {
            lat: user.address.geo.lat,
            lng: user.address.geo.lng,
          },
        },
        company: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs,
        },
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested fields
    if (name.includes(".")) {
      const parts = name.split(".");
      if (parts.length === 2) {
        const [parent, child] = parts;
        setFormData((prev) => {
          if (parent === "address") {
            return {
              ...prev,
              address: {
                ...prev.address,
                [child]: value,
              },
            };
          } else if (parent === "company") {
            return {
              ...prev,
              company: {
                ...prev.company,
                [child]: value,
              },
            };
          }
          return prev;
        });
      } else if (parts.length === 3) {
        const [parent, child, grandchild] = parts;
        if (parent === "address" && child === "geo") {
          setFormData((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              geo: {
                ...prev.address.geo,
                [grandchild]: value,
              },
            },
          }));
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    reset();

    const updatedUser = await updateUser(userId, formData);
    if (updatedUser) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  if (loadingUser) {
    return <LoadingSpinner message="Loading user data..." />;
  }

  if (userError) {
    return (
      <div className="container-fluid py-4">
        <ErrorMessage message={userError} onRetry={() => fetchUser(userId)} />
        <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
          <i className="fas fa-arrow-left me-1"></i>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <h1 className="mb-0">
              <i className="fas fa-user-edit me-2"></i>
              Edit User
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-secondary w-100 w-md-auto"
            >
              <i className="fas fa-arrow-left me-1"></i>
              Back
            </button>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              {success && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <i className="fas fa-check-circle me-1"></i>
                  User updated successfully! Redirecting to dashboard...
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {error && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <i className="fas fa-exclamation-circle me-1"></i>
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-user-circle text-primary fs-4 me-2"></i>
                    <h4 className="mb-0">Personal Information</h4>
                  </div>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="name" className="form-label">
                        Name *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="username" className="form-label">
                        Username *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-id-card"></i>
                        </span>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-phone"></i>
                        </span>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="website" className="form-label">
                        Website
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-globe"></i>
                        </span>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-map-marked-alt text-primary fs-4 me-2"></i>
                    <h4 className="mb-0">Address</h4>
                  </div>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="address.street" className="form-label">
                        Street
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-road"></i>
                        </span>
                        <input
                          type="text"
                          id="address.street"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="address.suite" className="form-label">
                        Suite
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-door-open"></i>
                        </span>
                        <input
                          type="text"
                          id="address.suite"
                          name="address.suite"
                          value={formData.address.suite}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="address.city" className="form-label">
                        City
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-city"></i>
                        </span>
                        <input
                          type="text"
                          id="address.city"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="address.zipcode" className="form-label">
                        Zipcode
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-mail-bulk"></i>
                        </span>
                        <input
                          type="text"
                          id="address.zipcode"
                          name="address.zipcode"
                          value={formData.address.zipcode}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="address.geo.lat" className="form-label">
                        Latitude
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-map-marker-alt"></i>
                        </span>
                        <input
                          type="text"
                          id="address.geo.lat"
                          name="address.geo.lat"
                          value={formData.address.geo.lat}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="address.geo.lng" className="form-label">
                        Longitude
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-map-marker-alt"></i>
                        </span>
                        <input
                          type="text"
                          id="address.geo.lng"
                          name="address.geo.lng"
                          value={formData.address.geo.lng}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-building text-primary fs-4 me-2"></i>
                    <h4 className="mb-0">Company</h4>
                  </div>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="company.name" className="form-label">
                        Company Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-industry"></i>
                        </span>
                        <input
                          type="text"
                          id="company.name"
                          name="company.name"
                          value={formData.company.name}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label
                        htmlFor="company.catchPhrase"
                        className="form-label"
                      >
                        Catch Phrase
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-quote-left"></i>
                        </span>
                        <textarea
                          id="company.catchPhrase"
                          name="company.catchPhrase"
                          value={formData.company.catchPhrase}
                          onChange={handleChange}
                          className="form-control"
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="company.bs" className="form-label">
                        BS
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-bullhorn"></i>
                        </span>
                        <textarea
                          id="company.bs"
                          name="company.bs"
                          value={formData.company.bs}
                          onChange={handleChange}
                          className="form-control"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary w-100 w-md-auto"
                  >
                    <i className="fas fa-times me-1"></i>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-100 w-md-auto"
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-1"></i>
                        Update User
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
