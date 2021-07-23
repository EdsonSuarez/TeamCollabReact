export default function Spinner() {
  return (
    <div className="card cardBorderUnset cardProjectBox">
      <div className="card-header text-center projectTitle">
        <div className="col-lg-12">
          <div className="form-group">Projects</div>
        </div>
      </div>
      <div className="card-body">
        <div className="container col-lg-12">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
