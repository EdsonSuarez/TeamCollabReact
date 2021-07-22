
export default function ProjectBoxForm({ title, onProjectBoxFormClose }) {

    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <div className="row">
                    <input className="form-control" placeholder="Name" />
                </div>
                <div className="row">
                    <textarea className="form-control" placeholder="Description"></textarea>
                </div>
                <div className="row m-2">
                    <div className="col-lg-12">Status</div>
                    <div className="col-lg-4">
                        <button
                            className="btn btn-light"
                        >
                            Doing
                        </button>
                    </div>
                    <div className="col-lg-4">
                        <button
                        className="btn btn-light"
                        >
                            Done
                        </button>
                    </div>
                    <div className="col-lg-4">
                        <button
                            className="btn btn-light"
                        >
                            To-do
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <button className="btn btn-info" >Save</button>
                    </div>
                    <div className="col-lg-6">
                        <button className="btn btn-danger" onClick={() => onProjectBoxFormClose(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div
                    className="alert alert-danger d-flex align-items-center m-2"
                    role="alert"
                    >
                        
                    </div>
                </div>
            </div>
        </div>
    );
}