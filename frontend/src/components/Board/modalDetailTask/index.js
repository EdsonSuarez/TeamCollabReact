import React from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt, faImage } from "@fortawesome/free-solid-svg-icons";
import { deleteTask } from "../../../services/task";

export default function ModalDetailTask({datos, onModalDetailTask}) {   
    
    // console.log("datos", datos)

    const getTask = () => {
        document.getElementById('task-window')?.click();
    }

    const delTask = () => {
        const taskId = localStorage.getItem("task")
        deleteTask(taskId)
            .then((res) => {
                console.log('Deleted task');
                document.getElementById('btn-close-modal')?.click();
                onModalDetailTask(taskId)
            })
            .catch((err) => console.log(err))
    }

    return (
    <div className="modal-dialog">
        <div className="modal-content" >
            <div className="modal-header">
                <h2 className="modal-title"> {datos.name} </h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close" id="btn-close-modal" ></button>
            </div>
            <div className="modal-body">
                <div className="divCentrado">
                    <h6>{datos.description}</h6>
                </div>

                <div className="divCentrado">
                    {datos.imageUrl ? <img src={datos.imageUrl} alt="Img task" className="imagen" /> : <FontAwesomeIcon style={{width:200, height:100}} icon={faImage}/>}                    
                </div>

                <div >
                    <h6>Priority: {datos.priority == 3
                        ? "High"
                        : datos.priority == 2
                        ? "Medium"
                        : "Low"}</h6>
                    <h6>Date: {datos.date}</h6>
                </div>

                
            </div>
            <div className="modal-footer">   

                <button
                    type="button"
                    className="btn btn-warning btn-xs m-1"
                    onClick={getTask}
                    data-bs-dismiss="modal"
                    >
                    <FontAwesomeIcon icon={faPencilAlt}/>
                </button>
                <button className="btn btn-danger btn-xs m-1" onClick={delTask}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Close  </button>
            </div>
        </div>
    </div>
    )
}