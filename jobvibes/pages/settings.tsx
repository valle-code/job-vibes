import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Navbar, Text, Button, Link } from "@nextui-org/react";
import styles from "./styles/settings.module.css";
import axios from "axios";
import User from "./api/Models/User";
import { useRouter } from 'next/router';


const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
          router.push("login");
        }
       
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();

  }, []);

  interface CollapseItem {
    name: string;
    link: string;
  }

  const collapseItems: CollapseItem[] = [
    {
      name: "Estadísticas",
      link: "estadisticas"
    },
    {
      name: "Ofertas",
      link: "ofertas"
    },
    {
      name: "Ajustes",
      link: "settings"
    },
    {
      name: "Contacto",
      link: "contacto"
    },
    {
      name: "Legal",
      link: "legal"
    },
    {
      name: "Sobre Nostros",
      link: "sobre-nosotros"
    },
    {
      name: "Ayuda & Feedback",
      link: "ayuda-feedback"
    },
    {
      name: "Login",
      link: "login"
    },
    {
      name: "Sign Up",
      link: "register"
    },
  ];

  return (
    <>
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
            <Navbar.Link href="#">Contacto</Navbar.Link>
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
      <div className={styles.sidenav}>
        <div className={styles.profile}>
          <img
            className={styles.profileimg}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
            alt=""
            width="100"
            height="100"
          />
          <div className={styles.name}>Daniel Valle</div>
          <div className={styles.job}>Programador</div>
        </div>
      </div>
      <div className={styles.main}>
        <h2 className={styles.subtitle}>Sobre mi</h2>
        <div className={styles.card}>
          <div className={styles.cardbody}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>Nombre:</td>
                  <td>Daniel</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>algo@gmail.com</td>
                </tr>
                <tr>
                  <td>Trabajo:</td>
                  <td>Programador</td>
                </tr>
                <tr>
                  <td>Habilidades:</td>
                  <td>Soy un inútil</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className={styles.subtitle}>Ajustes de usuario</h2>
        <div className={styles.card}>
          <div className={styles.cardbody}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>Sector deseado:</td>
                  <td>
                    <select className={styles.textinput}>
                      <option value="sector1">Sector 1</option>
                      <option value="sector2">Sector 2</option>
                      <option value="sector3">Sector 3</option>
                      <option value="sector1">Sector 1</option>
                      <option value="sector2">Sector 2</option>
                      <option value="sector3">Sector 3</option>
                      <option value="sector1">Sector 1</option>
                      <option value="sector2">Sector 2</option>
                      <option value="sector3">Sector 3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Años de experiencia:</td>
                  <td>
                    <div className={styles.textinput}>
                      <input className={styles.input} type="text" placeholder="Número" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Rango salarial deseado:</td>
                  <td>
                    <div className={styles.expand}>
                      <div className={styles.textinput}>
                        <input className={styles.input} type="text" placeholder="Mínimo" />
                      </div>
                      <div className={styles.textinput}>
                        <input className={styles.input} type="text" placeholder="Máximo" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Comunidad autónoma:</td>
                  <td>
                    <select className={styles.textinput}>
                      <option value="comunidad1">Comunidad 1</option>
                      <option value="comunidad2">Comunidad 2</option>
                      <option value="comunidad3">Comunidad 3</option>
                      <option value="comunidad1">Comunidad 1</option>
                      <option value="comunidad2">Comunidad 2</option>
                      <option value="comunidad3">Comunidad 3</option>
                      <option value="comunidad1">Comunidad 1</option>
                      <option value="comunidad2">Comunidad 2</option>
                      <option value="comunidad3">Comunidad 3</option>
                      <option value="comunidad1">Comunidad 1</option>
                      <option value="comunidad2">Comunidad 2</option>
                      <option value="comunidad3">Comunidad 3</option>
                      <option value="comunidad1">Comunidad 1</option>
                      <option value="comunidad2">Comunidad 2</option>
                      <option value="comunidad3">Comunidad 3</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Button size="md" shadow color="secondary" className={styles.btnSave} css={{ width: "100%", marginTop: "10px", boxShadow: "0px 8px 24px rgba(255, 0, 0, 0.2)", textSize:"30px" }}>Guardar</Button>
      </div>
    </>
  );
};

export default Home;
