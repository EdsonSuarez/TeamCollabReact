import React from "react";
import './style.css';

export default function ModalDetailTask({datos}) {   
    
    // console.log("datos", datos)

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
                    {datos.imageUrl ? <img src={datos.imageUrl} alt="Img task" className="imagen" /> : <img alt="imagen"/>}                    
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
                
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Close  </button>
            </div>
        </div>
    </div>
    )
}