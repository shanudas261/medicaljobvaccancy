import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../Components/JobCard";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <header className="hero">
        <h1>Medical Jobs</h1>
        <p>
          Find the latest healthcare and medical job opportunities.
        </p>
      </header>
       <Link to="/login" className="admin-button">
    Admin
  </Link>

      <main className="jobs-container">
        <h2>Latest Job Vacancies</h2>

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>
      <footer className="site-footer">
  <p>
    © 2026 Medical Jobs. All rights reserved.
  </p>

  <p>
    Website by{" "}
    <a
      href="https://wa.me/918281203973"
      target="_blank"
      rel="noopener noreferrer"
    >
      Shanu Das
    </a>
  </p>
</footer>
    </div>
    
  );
}

export default Home;
