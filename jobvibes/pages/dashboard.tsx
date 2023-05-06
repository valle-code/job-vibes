import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Navbar, Text, Button, Grid, Col, Link } from "@nextui-org/react";
import OptionCard from "../components/Index/OptionsCard";
import Footer from "../components/Index/Footer";
import styles from "./styles/dashboard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faTh } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import User from "./api/Models/User";

const DashBoard: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ul>
                    <li>
                        <a href="/">
                            <FontAwesomeIcon icon={faBars} style={{ fontSize: '35px', marginLeft: '15px' }} />
                            <div className={styles.title}>JobVibes</div>
                        </a>
                    </li>
                    <li>
                        <a href="dashboard">
                            <FontAwesomeIcon icon={faChartLine} style={{ fontSize: '35px', marginLeft: '15px' }} />
                            <div className={styles.title}>Dashboard</div>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={styles.main}>
                <div className={styles.topbar}>
                    <div className={styles.search}>
                        <input type="text" name="search" placeholder="Buscar usuarios" />
                        <label htmlFor="search">
                            <button className={styles.btn}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '25px' }} /></button>
                        </label>
                    </div>



                    <button className={styles.btn}><FontAwesomeIcon icon={faBell} style={{ fontSize: '25px', marginRight: '20px' }} /></button>

                    <button className={styles.btn}><div className={styles.user}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="" className={styles.img} />
                    </div>
                    </button>
                </div>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className="card-content">
                            <div className={styles.number}>20</div>
                            <div className={styles.cardname}>Nuevos Usuarios</div>
                        </div>
                        <div className="icon-box">
                            <i className="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className="card-content">
                            <div className={styles.number}>1</div>
                            <div className={styles.cardname}>Aministrador Conectado</div>
                        </div>
                        <div className="icon-box">
                            <i className="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className="card-content">
                            <div className={styles.number}>5</div>
                            <div className={styles.cardname}>Usuarios Baneados</div>
                        </div>
                        <div className="icon-box">
                            <i className="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className="card-content">
                            <div className={styles.number}>40</div>
                            <div className={styles.cardname}>Ofertas de Trabajo</div>
                        </div>
                        <div className="icon-box">
                            <i className="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                </div>
                <div className={styles.tables}>
                    <div className={styles.lastappointments}>
                        <div className={styles.heading}>
                            <h2>Usuarios Registrados</h2>
                            <button className={styles.btn}><img src="https://www.nicepng.com/png/full/251-2519428_0-add-icon-white-png.png" height="40px" alt="Añadir usuario"></img></button>
                        </div>
                        <table className={styles.usertable}>
                            <thead className={styles.tableHeader}>
                                <tr className={styles.tableHeaderRow}>
                                    <th className={styles.tableHeaderOptions}>Id</th>
                                    <th className={styles.tableHeaderOptions}>Nombre</th>
                                    <th className={styles.tableHeaderOptions}>Correo</th>
                                    <th className={styles.tableHeaderOptions}>Rol usuario</th>
                                    <th className={styles.tableHeaderOptions}>Banear</th>
                                    <th className={styles.tableHeaderOptions}>Eliminar</th>

                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><FontAwesomeIcon icon={faBan} style={{ fontSize: '40px' }} /></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                               
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;