import type { NextPage } from 'next';
import {Button, Link} from '@nextui-org/react';
import styles from './styles/login.module.css';

const RecoverPsw: NextPage = () => {
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
                    <input className = {styles.input} type="text" placeholder="Nombre de usuario"/>
                </div>
                <div className={styles.textinput}>
                    <input className = {styles.input} type="email" placeholder="Email"/>
                </div>
                <div className={styles.textinput}>
                    <input className = {styles.input} type="text" placeholder="Pista de verificación"/>
                </div>
                <div className={styles.textinput}>
                    <input className = {styles.input} type="password" placeholder="Contraseña"/>
                </div>
                <Button href="/" className={styles.loginbtn} ><Link href="login" css={{"color": "white"}}>Inicio de Sesión</Link></Button>
            </div>
        </div>
    </div>
  )
}

export default RecoverPsw