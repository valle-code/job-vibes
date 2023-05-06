import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { Button, Link } from '@nextui-org/react';
import styles from './styles/login.module.css';
import axios from 'axios';
import { signIn, useSession} from 'next-auth/react';

const Login: NextPage = () => {
    const { data: session } = useSession();
    useEffect(() => {
        console.log(session);
      }, [session]);
    const router = useRouter();

    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    const login = (loginUsername: string, loginPassword: string) => {
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
            console.log(err);
        });
    }

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
        </div>
    )
}

export default Login