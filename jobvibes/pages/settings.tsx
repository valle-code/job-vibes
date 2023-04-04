import { useState } from "react";
import type { NextPage } from "next";
import { Navbar, Text, Button, Link } from "@nextui-org/react";
import styles from "./styles/settings.module.css";

const Home: NextPage = () => {
  const collapseItems = [
    "Estadísticas",
    "Ofertas",
    "Ajustes",
    "Contacto",
    "Legal",
    "Sobre Nostros",
    "Ayuda & Feedback",
    "Login",
    "Sign Up",
  ];

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <Navbar variant="sticky">
          <Navbar.Brand>
            <Navbar.Toggle aria-label="toggle navigation" />
            <Text b color="inherit" hideIn="xs" css={{ marginLeft: "30px" }}>
              JobVibes
            </Text>
          </Navbar.Brand>
          <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
            <Navbar.Link href="#">Estadísticas</Navbar.Link>
            <Navbar.Link href="#">Ofertas</Navbar.Link>
            <Navbar.Link href="#">Ajustes</Navbar.Link>
            <Navbar.Link href="#">Contacto</Navbar.Link>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Link color="inherit" href="login">
              Login
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat as={Link} href="register">
                Sign Up
              </Button>
            </Navbar.Item>
          </Navbar.Content>
          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem key={item}>
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href="#"
                >
                  {item}
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
        <h2 className={styles.subtitle}>Identidad</h2>
        <div className="card">
          <div className="card-body">
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>Daniel</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>algo@gmail.com</td>
                </tr>
                <tr>
                  <td>Trabajo</td>
                  <td>:</td>
                  <td>Programador</td>
                </tr>
                <tr>
                  <td>Habilidades</td>
                  <td>:</td>
                  <td>Soy un inútil</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2>No sé</h2>
        <div className="card">
          <div className="card-body"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
