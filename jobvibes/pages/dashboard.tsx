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

import axios from "axios";
import User from "./api/Models/User";

const DashBoard: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ul>
                    <li>
                        <a href="/">
                            <i className="fas fa-clinic-medical"></i>
                            <FontAwesomeIcon icon={faBars} style={{fontSize: '20px'}} />
                            <div className={styles.title}>JobVibes</div>
                        </a>
                    </li>
                    <li>
                        <a href="dashboard">
                            <FontAwesomeIcon icon={faChartLine} style={{fontSize: '40px'}} />
                            <div className={styles.title}>Dashboard</div>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={styles.main}>
                <div className={styles.topbar}>
                    <div className={styles.search}>
                        
                        <input type="text" name="search" placeholder="Buscar usuarios" />
                    </div>
                    
                    <button className={styles.btn}><FontAwesomeIcon icon={faBell} style={{fontSize: '25px'}} /></button>

                    <div className={styles.user}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="" className={styles.img} />
                    </div>
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
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                </tr>
                                <tr className={styles.fields}>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}>Daniel </td>
                                    <td className={styles.field}><button className={styles.btn}><img src="https://www.shareicon.net/data/2015/09/15/101707_ban_512x512.png" height="41px" alt="Añadir usuario"></img></button></td>
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