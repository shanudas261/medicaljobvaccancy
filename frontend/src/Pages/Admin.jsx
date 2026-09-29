import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    qualification: "",
    experience: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Get all jobs
  async function fetchJobs() {
    try {
      const response = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/jobs"
      );

      setJobs(response.data);
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle input changes
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Add or update job
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/jobs/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Job updated successfully");
      } else {
        await axios.post(
          "${import.meta.env.VITE_API_URL}/api/jobs",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Job added successfully");
      }

      resetForm();
      fetchJobs();
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  }

  // Delete job
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job deleted successfully");

      fetchJobs();
    } catch (error) {
      console.log(error);

      alert("Failed to delete job");
    }
  }

  // Load job into form
  function handleEdit(job) {
    setEditingId(job._id);

    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary || "",
      qualification: job.qualification || "",
      experience: job.experience || "",
      description: job.description,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Reset form
  function resetForm() {
    setFormData({
      title: "",
      company: "",
      location: "",
      salary: "",
      qualification: "",
      experience: "",
      description: "",
    });

    setEditingId(null);
  }

  return (
    <div className="admin-page">

      {/* Header */}

      <header className="admin-header">

  <div className="admin-header-left">
    <h1>Medical Jobs Admin</h1>

    <p>
      Manage healthcare and medical job vacancies
    </p>
  </div>

  <div className="admin-header-actions">

    <Link
      to="/"
      className="admin-home-link"
    >
      View Website
    </Link>

    <button
      onClick={handleLogout}
      className="logout-button"
    >
      Logout
    </button>

  </div>

</header>

      <main className="admin-container">

        {/* Add / Edit Job */}

        <section className="admin-form-card">

          <div className="admin-form-header">

            <h2>
              {editingId
                ? "Edit Job Vacancy"
                : "Add New Job Vacancy"}
            </h2>

            <p>
              {editingId
                ? "Update the details of this job vacancy."
                : "Enter the details of the new medical job."}
            </p>

          </div>

          <form
            className="job-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label>Job Title</label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Staff Nurse"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company / Hospital</label>

              <input
                type="text"
                name="company"
                placeholder="e.g. Aster Hospital"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Kozhikode, Kerala"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Salary</label>

              <input
                type="text"
                name="salary"
                placeholder="e.g. ₹25,000 - ₹35,000"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Qualification</label>

              <input
                type="text"
                name="qualification"
                placeholder="e.g. B.Sc Nursing"
                value={formData.qualification}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Experience</label>

              <input
                type="text"
                name="experience"
                placeholder="e.g. 2+ years"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Job Description / Contact Details</label>

              <textarea
                name="description"
                placeholder="Enter job description, contact number, email, interview details, etc."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
              >
                {editingId
                  ? "Update Job"
                  : "Add Job"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

        {/* Existing Jobs */}

        <section>

          <div className="jobs-section-header">

            <h2>Existing Jobs</h2>

            <span className="job-count">
              {jobs.length}{" "}
              {jobs.length === 1 ? "Job" : "Jobs"}
            </span>

          </div>

          {jobs.length === 0 ? (

            <div className="empty-jobs">
              <p>No job vacancies have been added yet.</p>
            </div>

          ) : (

            <div className="admin-jobs-list">

              {jobs.map((job) => (

                <div
                  className="admin-job-card"
                  key={job._id}
                >

                  <div className="admin-job-top">

                    <div className="admin-job-info">

                      <h3>{job.title}</h3>

                      <p className="admin-job-company">
                        {job.company}
                      </p>

                      <p className="admin-job-location">
                        📍 {job.location}
                      </p>

                    </div>

                    <div className="admin-job-actions">

                      <button
                        className="edit-button"
                        onClick={() => handleEdit(job)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(job._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Admin;