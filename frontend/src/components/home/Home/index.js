import React from "react";
import './style.css';
import img1 from '../../../assets/img/lego-team-devs.jpg';
import img2 from '../../../assets/img/lego-pieces.jpg';
import img3 from '../../../assets/img/lego-team.jpg';
import img4 from "../../../assets/img/icon-scrum-master-solid.svg";
import img5 from "../../../assets/img/icon-tech-lead-solid.svg";
import img6 from "../../../assets/img/icon-developer-solid.svg";
import img7 from "../../../assets/img/icon-users-solid.svg";
import img8 from "../../../assets/img/background-team.jpg";

export default function Header() { 
    return(
        <>
        <div className="contenedorr">
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true"
                    aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner sizeCarousel">
                <div class="carousel-item active">
                    <img class="bd-placeholder-img sizeCarousel" width="100%" aria-hidden="true"
                        preserveAspectRatio="xMidYMid slice" focusable="false" src={img1}
                        alt="algo" />
                    <div class="container">
                        <div class="carousel-caption text-start">
                            <h1>Organize your Team</h1>
                            <p>With TeamCollab you can organize your project teams.</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <img class="bd-placeholder-img sizeCarousel" width="100%" aria-hidden="true"
                        preserveAspectRatio="xMidYMid slice" focusable="false" src={img2}
                        alt="" />
                    <div class="container">
                        <div class="carousel-caption dark   ">
                            <h1>Organize your activities</h1>
                            <p>Scrum Board to organize the activities of your project.</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <img class="bd-placeholder-img sizeCarousel" width="100%" aria-hidden="true"
                        preserveAspectRatio="xMidYMid slice" focusable="false" src={img3}
                        alt=""/>

                    <div class="container">
                        <div class="carousel-caption text-end">
                            <h1>Organize your projects</h1>
                            <p>The perfect tool to organize your projects.</p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="container px-4 py-5" id="featured-3">
            <h2 class="pb-2">Roles you can add</h2>
            <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div class="feature col">
                    <div class="feature-icon bg-primary bg-gradient">
                        <img class="bi" src={img4} alt="" />
                    </div>
                    <h2 class="role-title">Scrum Master</h2>
                    <p class="lead mb-4">Who will be able to create projects and add team members to them.</p>
                </div>
                <div class="feature col">
                    <div class="feature-icon bg-primary bg-gradient">
                        <img class="bi" src={img5} alt="" />
                    </div>
                    <h2 class="role-title">Technical Leader</h2>
                    <p class="lead mb-4">He can add tasks to the proyect and assign them to team members.</p>
                </div>
                <div class="feature col">
                    <div class="feature-icon bg-primary bg-gradient">
                        <img class="bi" src={img6} alt="" />
                    </div>
                    <h2 class="role-title">Developer</h2>
                    <p class="lead mb-4">He can change the status of the tasks. Form to-do, doing, testing, done</p>
                </div>
            </div>
        </div>

        <div class="px-4 text-center border-bottom hero-banner">
            <img class="d-block mx-auto mb-4" src={img7} alt="" width="72" height="57" />
            <h1 class="display-5 fw-bold">Team Collab</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">Web application to manage Scrum Teams</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3" routerLink="login">Log In</button>
                    <button type="button" class="btn btn-outline-secondary btn-lg px-4" routerLink="register">Register</button>
                </div>
            </div>
            <div class="overflow-hidden mb-6">
                <div class="container px-5">
                    <img src={img8} class="img-fluid border rounded-3 shadow-lg mb-4 sizeImgBotton"
                        alt="Example image" loading="lazy" />
                </div>
            </div>
        </div>
        </div>
        <footer class="text-center footer">&copy; CSS- CodeSoft Solutions <br/> Miguel Angel Cerquera Rodriguez - Cristian Andres Gomez - Natalia Ortiz Maldonado - Johan Stiven Quiroga - Edson Daniel Suarez</footer>
        </>
    );
}
