function JobCard({ job }) {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>

      <p className="company">{job.company}</p>

      <p>📍 {job.location}</p>

      {job.salary && <p>💰 {job.salary}</p>}

      {job.qualification && (
        <p>
          🎓 <strong>Qualification:</strong> {job.qualification}
        </p>
      )}

      {job.experience && (
        <p>
          💼 <strong>Experience:</strong> {job.experience}
        </p>
      )}

      <p className="description">{job.description}</p>

    </div>
  );
}

export default JobCard;