import type { NextPage } from 'next';
import {Button, Link} from '@nextui-org/react';
import styles from './styles/login.module.css';

const Login: NextPage = () => {
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
                    <input className = {styles.input} type="text" placeholder="Nombre de usuario"/>
                </div>
                <div className={styles.textinput}>
                    <input className = {styles.input} type="password" placeholder="Contraseña"/>
                </div>
                <Button href="/" className={styles.loginbtn} ><Link href="/" css={{"color": "white"}}>Inicio de Sesión</Link></Button>
                
                <div className={styles.googlebtn}>
                    <div className={styles.googleiconwrapper}>
                        <img className={styles.googleicon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                    </div>
                    <p className={styles.btntext}><b>Inicia sesión con Google</b></p>
                </div>
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