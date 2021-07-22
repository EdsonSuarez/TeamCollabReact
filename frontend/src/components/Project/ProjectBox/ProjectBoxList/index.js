import './styles.css';
export default function ProjectBoxList({
  name,
  description,
  status,
  date,
  active,
}) {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-header">{name}</div>
      <div className="card-body">
        <p className="card-text text-justify">{description}</p>
        <div className="row">
          <h5 className="card-title text-start">
            Status:
            <span>{status}</span>
          </h5>
        </div>
        <div className="row">
          <h5 className="card-title text-start">Date: {date}</h5>
        </div>
        <div className="row">
          <h5 className="card-title text-start">
            <span className="badge text-dark">
              {active ? "Active" : "Deleted"}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
}
