import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Navbar, Text, Button, Grid, Col, Link } from "@nextui-org/react";
import OptionCard from "../components/Index/OptionsCard";
import Footer from "../components/Index/Footer";
import styles from "./styles/dashboard.module.css";
import axios from "axios";
import User from "./api/Models/User";

const DashBoard: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ul>
                    <li>
                        <a href="#">
                            <i className="fas fa-clinic-medical"></i>
                            <div className={styles.title}>JobVibes</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-th-large"></i>
                            <div className={styles.title}>Dashboard</div>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={styles.main}>
                <div className={styles.topbar}>
                    <div className={styles.search}>
                        <input type="text" name="search" placeholder="search here" />
                    </div>
                    <i className="fas fa-bell"></i>
                    <div className={styles.user}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="" className={styles.img} />
                    </div>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="card-content">
                            <div className="number">67</div>
                            <div className="card-name">Appointments</div>
                        </div>
                        <div className="icon-box">
                            <i className="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                </div>
                <div className="tables">
                    <div className="last-appointments">
                        <div className="heading">
                            <h2>Usuarios Registrados</h2>
                            <a href="#" className="btn">Añadir más</a>
                        </div>
                        <table className="table">
                            <thead className="tableHeader">
                                <tr className="tableHeaderRow">
                                    <th className="tableHeaderOptions">Nombre</th>
                                    <th className="tableHeaderOptions">Nombre</th>
                                    <th className="tableHeaderOptions">Nombre</th>
                                    <th className="tableHeaderOptions">Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Daniel VALLE</td>
                                    <td>Daniel VALLE</td>
                                    <td>Daniel VALLE</td>
                                    <td>
                                        <i className="far fa-eye"></i>
                                        <i className="far fa-edit"></i>
                                        <i className="far fa-trash-alt"></i>
                                    </td>
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