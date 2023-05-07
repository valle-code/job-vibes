import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Navbar, Text, Button, Grid, Col, Link } from "@nextui-org/react";
import OptionCard from "../components/Index/OptionsCard";
import Footer from "../components/Index/Footer";
import styles from "./styles/jumbotron.module.css";
import axios from "axios";
import User from "./api/Models/User";

const Home: NextPage = () => {
  interface CollapseItem {
    name: string;
    link: string;
  }

  const [user, setUser] = useState<User | null>(null);

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
          setUser(usuario);
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

  


  useEffect(() => {
    // Llamada a la función getUser al cargar el componente
    getUser();
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
      link: "contacto",
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
      {/* Jumbotron */}

      <Grid.Container
        justify="center"
        css={{
          height: "400px",
          width: "99%",
          borderRadius: "10px",
          backgrounImage: "url(/jumboton.png)",
          marginLeft: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Grid xs={12} sm={5} alignItems="center">
          <Col css={{ width: "100%" }}>
            <Text
              weight={"bold"}
              size={70}
              css={{ textAlign: "center", color: "white" }}
            >
              JobVibes
            </Text>
            <Text
              weight={"bold"}
              size={65}
              css={{ textAlign: "center", color: "white", width: "100%" }}
            >
              Tu trabajo cuenta
            </Text>
            <Button
              className={styles.join}
              size="md"
              shadow
              color="primary"
              css={{
                width: "100%",
                marginTop: "10px",
                boxShadow: "0px 8px 24px rgba(255, 0, 0, 0.2)",
              }}
            >
              Únete GRATIS Ahora
            </Button>
          </Col>
        </Grid>
      </Grid.Container>
      {/* Cards */}
      <Grid.Container gap={2}>
        <Grid xs={12} sm={4}>
          <OptionCard
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/3009793/pexels-photo-3009793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="3,500"
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <OptionCard
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/7654179/pexels-photo-7654179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="1,000"
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <OptionCard
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/5711267/pexels-photo-5711267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="5,000"
          />
        </Grid>
      </Grid.Container>
      {/* Footer */}

      <div
        style={{ width: "100%", backgroundColor: "white", marginRight: "30px" }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Home;
