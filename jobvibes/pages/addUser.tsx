import { useState } from 'react';
import type { NextPage } from 'next';
import { Link, Button } from '@nextui-org/react';
import styles from './styles/register.module.css';
import axios from 'axios';
import {signIn} from 'next-auth/react';
import { useRouter } from 'next/router';


const Register: NextPage = () => {

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState('Usuario');
    const router = useRouter();


    const register = (email: string, username: string, password: string, rol: string) => {
        axios({
          method: 'post',
          data: {
            email: email,
            username: username,
            password: password,
            rol: selectedRole
          },
          withCredentials: true,
          url: 'http://localhost:3001/addUser'
        }).then(res => {console.log(res)
            router.push('/dashboard');
        }
        ).catch(err => {console.log(err)});
      }

      const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
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
                    <h3 className={styles.title}>Añadir Usuario</h3>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="text" name="username" placeholder="Nombre de usuario" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="password" name="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <select className={styles.textinput} value={selectedRole} onChange={handleRoleChange}>
                        <option value="Usuario">Usuario</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                   
                    <button onClick={() => register(email, username, password, selectedRole)} className={styles.loginbtn}>
                        <p style={{ "color": "white", "background": "none" }}>Añadir usuario</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register