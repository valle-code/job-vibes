import { useState, useEffect } from "react";
import type { NextPage } from "next";
import styles from "./styles/dashboard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import axios from "axios";
import User from "./api/Models/User";
import JobOfferData from './api/Models/JobOffer';
import Report from './api/Models/Report';
import { Modal, useModal } from '@nextui-org/react';
import PopUp from '../components/Global/PopUp';

const DashBoard: NextPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [jobOffers, setJobOffers] = useState<JobOfferData[]>([]);
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { setVisible, bindings } = useModal();
    const [reports, setReports] = useState<Report[]>([]);
    const router = useRouter();

    const getUser = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getUser",
        })
            .then((res) => {
                const userData = res.data;
                const usuario = new User(userData.id, userData.username, userData.password, userData.email, userData.userRole, userData.adminRole, userData.bannedRole);
                console.log(usuario.id, usuario.username, usuario.password, usuario.userRole, usuario.adminRole, usuario.bannedRole)
                if (userData.username === undefined || userData.adminRole === 0) {
                    router.push('login');
                } else {
                    if (userData.bannedRole === 1) {
                        router.push("/ban");
                    } else {
                        setUser(usuario);
                    }
                }

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const logout = () => {
        axios({
            method: "post",
            withCredentials: true,
            url: "http://localhost:3001/logout",
        })
            .then(() => {
                setUser(null);
                router.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllUsers = () => {
        axios.get<User[]>("http://localhost:3001/getUsers", { withCredentials: true })
            .then((response) => {
                const usersData = response.data.map((user) => {
                    return {
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        userRole: user.userRole,
                        adminRole: user.adminRole,
                        bannedRole: user.bannedRole
                    };
                });
                setUsers(usersData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getReports = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getReports",
          })
            .then((res) => {
              const reportsData = res.data.map((row: any) => new Report(row.id, row.idPost, row.titleReport, row.descriptionReport, row.thumbnailJobPost, row.creationDateReport));
              setReports(reportsData);
            })
            .catch((err) => {
              console.log(err);
            });
    }

    const getUsuariosBaneados = () => { return users.filter((user) => user.bannedRole === 1).length; }

    const getJobOffers = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getJobOffer",
        })
            .then((res) => {
                const jobOffersData = res.data.map((row: any) => new JobOfferData(row.id, row.title, row.description, row.thumbnail, row.jobDetails, row.creationDate));
                setJobOffers(jobOffersData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDelete = (id: number) => {
        axios({
            method: "delete",
            withCredentials: true,
            url: `http://localhost:3001/deleteUser/${id}`,
        })
            .then((res) => {
                console.log(res);
                getAllUsers();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleBan = (id: number) => {
        axios({
            method: "put",
            withCredentials: true,
            url: `http://localhost:3001/banUser/${id}`,
        })
            .then((res) => {
                console.log(res);
                getAllUsers();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getSearchedUsers = (searchQuery: string) => {
        axios({
            method: "get",
            withCredentials: true,
            url: `http://localhost:3001/searchUser/${searchQuery}`,
        })
            .then((res) => {
                const usersData = res.data.map((user: User) => {
                    return {
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        userRole: user.userRole,
                        adminRole: user.adminRole,
                        bannedRole: user.bannedRole
                    };
                });
                setSearchedUsers(usersData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePopupClose = () => {
        setVisible(false);
    };

    const handleSearch = () => {
        if (searchQuery !== "") {
            getSearchedUsers(searchQuery);
        } else {
            setVisible(true);
        }
    }

    useEffect(() => {
        // Llamada a la función getUser al cargar el componente
        getUser();
        getAllUsers();
        getJobOffers();
        getReports();
    }, []);

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
                        <input type="text" name="search" placeholder="Buscar usuarios" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <label htmlFor="search">
                            <button className={styles.btn} onClick={() => handleSearch()}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '25px' }} /></button>
                        </label>
                    </div>

                    <button className={styles.btn} onClick={() => router.push("reports")}>{reports.length > 0 ? <FontAwesomeIcon icon={faBell} style={{ fontSize: '25px', marginRight: '20px', color: 'red' }}/> : <FontAwesomeIcon icon={faBell} style={{ fontSize: '25px', marginRight: '20px', color: 'black' }}/>}</button>

                    <button className={styles.btn} onClick={() => logout()}><div className={styles.user}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="" className={styles.img} />
                    </div>
                    </button>
                </div>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className="card-content">
                            <div className={styles.number}>{users.length}</div>
                            <div className={styles.cardname}>Usuarios registrados</div>
                        </div>

                    </div>
                    <div className={styles.card}>
                        <div className="card-content">
                            <div className={styles.number}>1</div>
                            <div className={styles.cardname}>Administrador Conectado</div>
                        </div>

                    </div>
                    <div className={styles.card}>
                        <div className="card-content">
                            <div className={styles.number}>{getUsuariosBaneados()}</div>

                            <div className={styles.cardname}>{getUsuariosBaneados() === 1 ? "Usuario Baneado" : "Usuarios Baneados"}</div>
                        </div>

                    </div>
                    <div className={styles.card}>
                        <div className="card-content">
                            <div className={styles.number}>{jobOffers.length}</div>
                            <div className={styles.cardname}>Ofertas de Trabajo</div>
                        </div>

                    </div>
                </div>
                <div className={styles.tables}>
                    <div className={styles.lastappointments}>
                        <div className={styles.heading}>
                            <h2>Usuarios Registrados</h2>
                            <a href="addUser" className={styles.btn} ><img src="https://www.nicepng.com/png/full/251-2519428_0-add-icon-white-png.png" height="40px" alt="Añadir usuario"></img></a>
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
                                {searchedUsers.length > 0 ? (
                                    searchedUsers.map((user) => (
                                        <tr className={styles.fields}>
                                            <td className={styles.field}>{user.id}</td>
                                            <td className={styles.field}>{user.username}</td>
                                            <td className={styles.field}>{user.email}</td>
                                            <td className={styles.field}>{user.adminRole === 1 ? "Admin" : "Usuario"}</td>
                                            <td className={styles.field}><button onClick={() => handleBan(user.id)} className={styles.btn}>{user.bannedRole === 1 ? <FontAwesomeIcon icon={faBan} style={{ fontSize: '40px', color: "red" }} /> : <FontAwesomeIcon icon={faBan} style={{ fontSize: '40px', }} />}</button></td>
                                            <td className={styles.field}><button onClick={() => handleDelete(user.id)} className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                        </tr>
                                    ))
                                ) : (
                                    users.map((user) => (
                                        <tr className={styles.fields}>
                                            <td className={styles.field}>{user.id}</td>
                                            <td className={styles.field}>{user.username}</td>
                                            <td className={styles.field}>{user.email}</td>
                                            <td className={styles.field}>{user.adminRole === 1 ? "Admin" : "Usuario"}</td>
                                            <td className={styles.field}><button onClick={() => handleBan(user.id)} className={styles.btn}>{user.bannedRole === 1 ? <FontAwesomeIcon icon={faBan} style={{ fontSize: '40px', color: "red" }} /> : <FontAwesomeIcon icon={faBan} style={{ fontSize: '40px', }} />}</button></td>
                                            <td className={styles.field}><button onClick={() => handleDelete(user.id)} className={styles.btn}><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" height="40px" alt="Añadir usuario"></img></button></td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            <Modal
                scroll
                width="450px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <PopUp
                    title="Error"
                    description="Rellena todos los campos"
                    onClose={handlePopupClose}
                />
            </Modal>
        </div>
    );
}

export default DashBoard;