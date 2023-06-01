import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styles from './styles/login.module.css';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { Modal, useModal, Button, Link, Text } from "@nextui-org/react";
import PopUp from '../components/Global/PopUp';

const Login: NextPage = () => {


    const router = useRouter();

    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const { setVisible, bindings } = useModal();

    useEffect(() => {
        console.log(`El valor de showPopup es ${showPopup}`);
    }, [showPopup]);



    const login = (loginUsername: string, loginPassword: string) => {
        if (!loginUsername.trim() || !loginPassword.trim()) {
            setVisible(true);
            return;
        }
        axios({
            method: 'post',
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: 'http://localhost:3001/login'
        }).then(res => {
            console.log(res);
            router.push('/');
        }).catch(err => {
            if (err.response && err.response.status === 403) {
                router.push('/ban');
            } else {
                setVisible(true);
            }
            return;
        });
    }

    const handlePopupClose = () => {
        setVisible(false);
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
                    <h3 className={styles.title}>Inicio de Sesión</h3>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="text" name="loginUsername" placeholder="Nombre de usuario" onChange={e => setLoginUsername(e.target.value)} />
                    </div>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="password" name="loginPassword" placeholder="Contraseña" onChange={e => setLoginPassword(e.target.value)} />
                    </div>
                    <button onClick={() => login(loginUsername, loginPassword)} className={styles.loginbtn} ><p style={{ "color": "white" }}>Inicio de Sesión</p></button>

                    <button type="button" onClick={() => signIn("google")} className={styles.googlebtn}>
                        <div className={styles.googleiconwrapper}>
                            <img className={styles.googleicon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        </div>
                        <p className={styles.btntext}><b>Inicia sesión con Google</b></p>
                    </button>
                    <Link className={styles.forgot} href="recoverpsw">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <div className={styles.create}>
                        <Link className={styles.createLink} href="register">
                            Crea tu cuenta aquí
                        </Link>
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
                    description="Usuario o contraseña incorrectos"
                    onClose={handlePopupClose}
                />
            </Modal>
        </div>
    )
}

export default Login