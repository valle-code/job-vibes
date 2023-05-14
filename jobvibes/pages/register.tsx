import { useState } from 'react';
import type { NextPage } from 'next';
import { Link, Button, Modal, useModal } from '@nextui-org/react';
import styles from './styles/register.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import {signIn} from 'next-auth/react';
import PopUp from '../components/Global/PopUp';

const Register: NextPage = () => {

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { setVisible, bindings } = useModal();
    
    const router = useRouter();

  const handlePopupClose = () => {
      setVisible(false);
  };

const register = (email: string, username: string, password: string) => {

  if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
    setError('Todos los campos son obligatorios');
    setVisible(true);
    return;
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    setError('El email no es válido');
    setVisible(true);

    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!passwordRegex.test(password)) {
    setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
    setVisible(true);

    return;
  }

  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden');
    setVisible(true);

    return;
  }
  axios({
    method: 'post',
    data: {
      email: email,
      username: username,
      password: password
    },
    withCredentials: true,
    url: 'http://localhost:3001/register'
  }).then(res => {
    if (res.data.includes('El usuario ya existe con nombre')) {
      setError(res.data);
      setVisible(true);

      return;
    } else {
      router.push('login');
    }
  }).catch(err => {
    setError('Error al registrar el usuario');
    setVisible(true);

    return;
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
                    <h3 className={styles.title}>Registro de Usuario</h3>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="text" name="username" placeholder="Nombre de usuario" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="password" name="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="password" name="confirmPassword" placeholder="Confirma tu contraseña" onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <button onClick={() => register(email, username, password)} className={styles.loginbtn}>
                        <p style={{ "color": "white", "background": "none" }}>Registro de Usuario</p>
                    </button>

                    {/* Google Button */}

                    <button type="button" onClick={() => signIn("google")} className={styles.googlebtn}>
                        <div className={styles.googleiconwrapper}>
                            <img className={styles.googleicon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        </div>
                        <p className={styles.btntext}><b>Inicia sesión con Google</b></p>
                    </button>
                    <Link className={styles.forgot} href="recupera-contrasena">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <div className={styles.create}>
                        <Link className={styles.createLink} href="login">
                            ¿Tienes una cuenta ya?
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
                    description={error}
                    onClose={handlePopupClose}
                />
            </Modal>
        </div>
    )
}

export default Register