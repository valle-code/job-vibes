import { useState } from 'react';
import type { NextPage } from 'next';
import { Container, Navbar, Text, Button, Grid, Col } from '@nextui-org/react';
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
                <h3 className={styles.title}>Resgistro de Usuario</h3>
                <div className={styles.textinput}>
                    <input className = {styles.input} type="text" placeholder="Username"/>
                </div>
                <div className={styles.textinput}>
                    <input className = {styles.input} type="password" placeholder="Password"/>
                </div>
                <button className={styles.loginbtn}>LOGIN</button>
                <a href="#" className={styles.forgot}>Olvidaste tu contraseña?</a>
                <div className={styles.create}>
                    <a className={styles.createLink} href="#">¿Tienes una cuenta ya?</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login