import { useSelector } from 'react-redux';

export default function ProjectBox() {
    const projects = useSelector((state) => state.projects);
    return(
        <div className="card cardBorderUnset">
            <div className="card-header text-center title">
                <div className="col-lg-12">
                    <div className="form-group" >Projects</div>
                    <div className="form-group float-end">

                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <input type="search" className="form-control filter-project float-end" placeholder="Filter by project name" />
                </div>
                <div className="row justify-content-center">
                    {
                        projects.projects?.map(
                            (project, i) => (
                                <p key={i}>{project.name}</p>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
};