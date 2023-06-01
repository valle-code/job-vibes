import { useRouter } from 'next/router';
import styles from './styles/ban.module.css';
import type { NextPage } from "next";

const Ban: NextPage = () => {

    const router = useRouter();
      
    return (
        <div className={styles.container}>
            <div className={styles.titlesection}>
                <h1 className={styles.title}>Has sido baneado</h1>
                <p className="text">Lo sentimos, pero has sido baneado por un administrador. Si crees que esto es un error, contacta con un administrador.</p>
                <br />
                <button className={styles.button} onClick={() => router.push('login')}>Volver al inicio</button>
            </div>
        </div>
    )
}

export default Ban