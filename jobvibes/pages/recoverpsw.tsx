import type { NextPage } from 'next';
import {Button, Link} from '@nextui-org/react';
import styles from './styles/login.module.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const RecoverPsw: NextPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const changePassword = () => {
        axios({
            method: "post",
            data: {
                username: user,
                email: email,
                password: password
            },
            withCredentials: true,
            url: "http://localhost:3001/recoverPsw",
        })
            .then(() => {
                router.push("login");
            })
            .catch((err) => {
                alert("Error al cambiar la contraseña, verifica que el usuario y el correo sean correctos");
                return;
            });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
            <div className={styles.design}>
                <div className={`${styles.pill1} ${styles['rotate-45']}`}></div>
                <div className={`${styles.pill2} ${styles['rotate-45']}`}></div>
                <div className={`${styles.pill3} ${styles['rotate-45']}`}></div>
                <div className={`${styles.pill4} ${styles['rotate-45']}`}></div>
            </div>
                <div className={styles.login}>
                    <h3 className={styles.title}>Cambiar Contraseña</h3>
                    <div className={styles.textinput}>
                        <input className = {styles.input} type="text" placeholder="Nombre de usuario" onChange={e => setUser(e.target.value)} />
                    </div>
                    <div className={styles.textinput}>
                        <input className = {styles.input} type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className={styles.textinput}>
                        <input className = {styles.input} type="password" placeholder="Nueva contraseña" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <Button className={styles.loginbtn} onClick={() => changePassword()} >Inicio de Sesión</Button>
                </div>
            </div>
        </div>
    )
    }

export default RecoverPsw