import { useRouter } from 'next/router';
import styles from './styles/ban.module.css';
import type { NextPage } from "next";

const Ban: NextPage = () => {

    const router = useRouter();
      
    return (
        <div className="container">
            <div className="title-section">
                <h1 className="title">Has sido baneado</h1>
            </div>
            <div className="text-section">
                <p className="text">Lo sentimos, pero has sido baneado por un administrador. Si crees que esto es un error, contacta con un administrador.</p>
            </div >
            <div className="button-section">
                <button className="button" onClick={() => router.push('login')}>Volver al inicio</button>
            </div>
        </div>
    )
}

export default Ban