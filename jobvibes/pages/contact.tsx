import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Navbar, Text, Button, Grid, Col, Link, Modal, useModal } from "@nextui-org/react";
import OptionCard from "../components/Index/OptionsCard";
import Footer from "../components/Index/Footer";
import styles from './styles/login.module.css';
import axios from "axios";
import User from "./api/Models/User";
import JobOfferData from './api/Models/JobOffer';
import JobOffer from '../components/Joboffers/JobOffer'; 
import { useRouter } from "next/router";
import PopUp from '../components/Global/PopUp';


const Home: NextPage = () => {
  interface CollapseItem {
    name: string;
    link: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [jobOffers, setJobOffers] = useState<JobOfferData[]>([]);
  const { setVisible, bindings } = useModal();


  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getUser",
    })
      .then((res) => {
        const userData = res.data;
        const usuario = new User(userData.id, userData.username, userData.password, userData.email, userData.userRole, userData.adminRole, userData.bannedRole);
        console.log(usuario.id, usuario.username, usuario.password, usuario.userRole, usuario.adminRole, usuario.bannedRole)
        if (userData.username !== undefined) {
          if(userData.bannedRole === 1) {
            router.push("/ban");
          } else {
            setUser(usuario);
          }
        } else {
          setUser(null);
        }
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    })
      .then(() => {
        setUser(null); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const joinFree = () => {
    router.push("register");
  };

  const getJobOffers = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getJobOffer",
    })
      .then((res) => {
        const jobOffersData = res.data.slice(0, 3).map((row: any) => new JobOfferData(row.id, row.title, row.description, row.thumbnail, row.jobDetails, row.creationDate));
        setJobOffers(jobOffersData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlePopupClose = () => {
    setVisible(false);
};

  useEffect(() => {
    // Llamada a la función getUser al cargar el componente
    getUser();
    getJobOffers();
  }, []);

  const collapseItems: CollapseItem[] = [
    {
      name: "Estadísticas",
      link: "estadisticas",
    },
    {
      name: "Ofertas",
      link: "ofertas",
    },
    {
      name: "Ajustes",
      link: "settings",
    },
    {
      name: "Contacto",
      link: "contact",
    },
    {
      name: "Legal",
      link: "legal",
    },
    {
      name: "Sobre Nostros",
      link: "sobre-nosotros",
    },
    {
      name: "Ayuda & Feedback",
      link: "ayuda-feedback",
    },
    {
      name: "Login",
      link: "login",
    },
    {
      name: "Sign Up",
      link: "register",
    },
    {
      name: "Dashboard",
      link: "dashboard",
    },
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* Navbar */}
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <Navbar variant="sticky">
          <Navbar.Brand>
            <Navbar.Toggle aria-label="toggle navigation" />
            <Text b color="inherit" hideIn="xs" css={{ marginLeft: "30px" }}>
              <Link css={{ color: "Black" }} href="/">
                JobVibes
              </Link>
            </Text>
          </Navbar.Brand>
          <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
            <Navbar.Link href="#">Estadísticas</Navbar.Link>
            <Navbar.Link href="joboffers">Ofertas</Navbar.Link>
            <Navbar.Link href="settings">Ajustes</Navbar.Link>
            {user?.adminRole === 1 ? <Navbar.Link href="dashboard">Dashboard</Navbar.Link> : <Navbar.Link href="contact">Contacto</Navbar.Link>}

          </Navbar.Content>
          <Navbar.Content>
            {user ? (
              <>
                <Navbar.Item>
                  <Button auto flat as={Link} onClick={() => logout()}>
                    Cerrar sesión
                  </Button>
                </Navbar.Item>
                <Text color="inherit">Bienvenido, {user.username}</Text>
              </>
            ) : (
              <>
                <Navbar.Link color="inherit" href="login">
                  Login
                </Navbar.Link>
                <Navbar.Item>
                  <Button auto flat as={Link} href="register">
                    Sign Up
                  </Button>
                </Navbar.Item>
              </>
            )}
          </Navbar.Content>

          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem key={index}>
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href={item.link}
                >
                  {item.name}
                </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.design}>
                    <div className={`${styles.pill1} ${styles['rotate-45']}`}></div>
                    <div className={`${styles.pill2} ${styles['rotate-45']}`}></div>
                    <div className={`${styles.pill3} ${styles['rotate-45']}`}></div>
                    <div className={`${styles.pill4} ${styles['rotate-45']}`}></div>
                </div>
                <form className={styles.login} action="https://formsubmit.co/danivalle.code@gmail.com" method="POST">
                    <h3 className={styles.title}>Contacto</h3>
                    <div className={styles.textinput}>
                        <input className={styles.input} type="text" name="name" value={user?.username} disabled placeholder="Nombre de usuario"  />
                    </div>
                    <div className={styles.textarea}>
                        <textarea className={styles.input} name="content" placeholder="Hola buenas, en que podemos ayudarte"  />
                    </div>
                    <button  className={styles.loginbtn} type="submit" ><p style={{ "color": "white" }}>Enviar</p></button>
                </form>
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
                    description="Por favor, rellene todos los campos"
                    onClose={handlePopupClose}
                />
            </Modal>
        </div>

      <div
        style={{ width: "100%", backgroundColor: "white", marginRight: "30px" }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Home;
