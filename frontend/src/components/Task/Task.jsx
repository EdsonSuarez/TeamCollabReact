import "./styles.css";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlus,
  faUserPlus,
  faUserMinus
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Alert } from "@material-ui/lab";
import {
  saveTask,
  saveTaskImg,
  editTask,
  deleteTask,
  getTasks,
  getOneTask,
  updateTask,
  getTeam,
  addDetail,
  getUsersTask,
  deleteDetail,
  getManyTask,
} from "../../services/task";

export default function Task() {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    boardId: "",
    priority: "",
  });

  const [errormsg, setErrormsg] = useState("");
  const [errormsgUser, setErrormsgUser] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [successmsgUser, setSuccessmsgUser] = useState("");
  const [flagImage, setFlagImage] = useState(true);
  const [flagEditTask, setFlagEditTask] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamTasks, setTeamTasks] = useState([]);
  const [taskId, setTaskId] = useState("");

  const onInit = () => {
    setTaskData({
      ...taskData,
      boardId: localStorage.getItem("sprint"),
      priority: "Priority",
    });

    setTaskId(localStorage.getItem("task"));
    if (taskId) {
      setFlagEditTask(true);
      setFlagImage(false);
      getOneTask(taskId)
        .then((res) => {
          setTaskData(res.data.userTask);
          // console.log(res.data.userTask)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getTasks().then((res) => {
      setTeamTasks(res.data.userTask);
      // console.log(res.data.userTask)
    });
  };

  const onSave = (task) => {
    if (task) {
      saveTask(task)
        .then((response) => {
          console.log(response);
          setSuccessmsg("Task created succesfully");
          closeAlert(3000);
        })
        .catch((error) => {
          setErrormsg("Failed process");
          console.log(error.message);
          closeAlert(3000);
        });
    }
  };

  const usersTeam = () => {
    if (flagEditTask == true) {
      getUsersTask(taskId)
        .then((res) => {
          console.log(res.data.users);
          setTeamMembers(res.data.users);
        })
        .catch((error) => console.log(error));
    } else {
      const teamId = localStorage.getItem("team");
      getTeam(teamId)
        .then((res) => {
          console.log(res.data.team);
          setTeamMembers(res.data.team);
        })
        .catch((error) => console.log(error));
    }
  };

  const userAdd = (member) => {
    setTaskId(localStorage.getItem("task"));
    console.log(member);
    // let taskDetail = {userId: member.userId._id, taskId: taskId}

    // addDetail(taskDetail)
    //   .then((res) => {
    //     setSuccessmsgUser(`Task assigned to ${member.userId.fullName}`);
    //     closeAlert(3000);
    //   })
    //   .catch((error) => {
    //     setErrormsgUser(error.message);
    //     closeAlert(3000);
    //     console.log(error);
    //   })
  };

  const userDelete = (userId) => {
    console.log(userId);
    // deleteDetail(userId)
    //   .then((res) => {
    //     setSuccessmsgUser("Task unassigned");
    //     closeAlert(3000);
    //   })
    //   .catch((error) => {
    //     setErrormsgUser(error.message);
    //     closeAlert(3000);
    //   });
  };

  const deleteLocalInfo = () => {
    localStorage.removeItem("task");
    setFlagEditTask(false);
    setFlagImage(true);
  };

  const closeAlert = (time) => {
    setTimeout(() => {
      setErrormsg("");
      setSuccessmsg("");
      setSuccessmsgUser("");
      setErrormsgUser("");
    }, time);
  };

  return (
    <>
      <a
        id="task-window"
        data-bs-toggle="modal"
        data-bs-target="#modalTask"
        className="return-board-button"
        onClick={() => onInit()}
      >
        <FontAwesomeIcon icon={faPlus} className="return-board-icon" />
      </a>

      <div
        className="modal fade"
        id="modalTask"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">
                Create Task
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={deleteLocalInfo}
              ></button>
            </div>
            <div className="container alerta">
              {successmsg !== "" ? (
                <Alert
                  variant="outlined"
                  severity="success"
                  className="alertaTask"
                  onClose={() => closeAlert(0)}
                >
                  {successmsg}
                </Alert>
              ) : (
                <div className="alerta"></div>
              )}

              {errormsg !== "" ? (
                <Alert
                  variant="outlined"
                  severity="error"
                  className="alertaTask"
                  onClose={() => closeAlert(0)}
                >
                  {errormsg}
                </Alert>
              ) : (
                <div className="alerta"></div>
              )}
            </div>

            <div className="modal-body">
              <input
                onChange={(e) =>
                  setTaskData({ ...taskData, name: e.target.value })
                }
                defaultValue={taskData.name}
                // value={task.name}
                className="form-control"
                type="text"
                required
                placeholder="Task"
              />
              <br />
              <textarea
                onChange={(e) =>
                  setTaskData({ ...taskData, description: e.target.value })
                }
                defaultValue={taskData.description}
                type="text"
                className="form-control"
                required
                placeholder="Description"
              />
              <br />
              <select
                onChange={(e) =>
                  setTaskData({ ...taskData, priority: e.target.value })
                }
                defaultValue={taskData.priority}
                className="form-select"
                required
              >
                <option defaultValue>Priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
              <br />
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Load image
                </label>
                <input
                  // onChange={handleFile}
                  // defaultValue={taskData.file[0]}
                  // onChange={(e) => setTaskFile(e.target)}
                  // onChange={(e) => setTaskData({...taskData, file: e.target.value})}
                  accept=".png, .jpg, .jpeg, .gif, image/*"
                  className="form-control"
                  type="file"
                  id="formFile"
                  // {...register("file")}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-info btn-xs m-1"
                onClick={() => onSave(taskData)}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button
                className="btn btn-success btn-xs m-1"
                onClick={usersTeam}
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  data-bs-toggle="modal"
                  data-bs-target="#modalTeam"
                />
              </button>
              <button
                type="submit"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={deleteLocalInfo}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalTeam"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">
                Team
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container alerta">
                {successmsgUser !== "" ? (
                  <Alert
                    variant="outlined"
                    severity="success"
                    className="alertaTask"
                    onClose={() => closeAlert(0)}
                  >
                    {successmsgUser}
                  </Alert>
                ) : (
                  <div className="alerta"></div>
                )}

                {errormsgUser !== "" ? (
                  <Alert
                    variant="outlined"
                    severity="error"
                    className="alertaTask"
                    onClose={() => closeAlert(0)}
                  >
                    {errormsgUser}
                  </Alert>
                ) : (
                  <div className="alerta"></div>
                )}
              </div>

              {!teamMembers.length ? (
                <div>
                  <span>No team members assigned</span>
                  <span className="spacer" />
                </div>
              ) : (
                teamMembers.map((member, index) =>
                  member.userId != null ? (
                    <div className="displayFlex" key={index}>
                      <span>{member.userId.fullName}</span>
                      <span className="spacer"></span>
                      {!flagEditTask == true ? (
                      <button
                        className="btn btn-success btn-xs m-1"
                        onClick={()=> userAdd(member)}
                      >
                        <FontAwesomeIcon icon={faUserPlus} />
                      </button>
                      ) : (<></>)} 
                      <button
                        className="btn btn-danger btn-xs m-1"
                        onClick={()=> userDelete(member.userId)}
                      >
                        <FontAwesomeIcon icon={faUserMinus} />
                      </button>
                      
                    </div>
                  ) : (
                    <p></p>
                  )
                )
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
