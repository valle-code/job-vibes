import { useState } from 'react';
import type { NextPage } from 'next';
import { Navbar, Text, Button, Grid, Col, Link } from '@nextui-org/react';
import styles from './styles/jobpost.module.css';
import Comment from '../components/Posts/Comment';

const Home: NextPage = () => {

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
    <div style={{ "height": "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Navbar */}
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <Navbar variant="sticky">
          <Navbar.Brand>
            <Navbar.Toggle aria-label="toggle navigation" />
            <Text b color="inherit" hideIn="xs" css={{ "marginLeft": "30px" }}>
              <a href="/">JobVibes</a>
            </Text>
          </Navbar.Brand>
          <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
            <Navbar.Link href="#">Estadísticas</Navbar.Link>
            <Navbar.Link href="joboffers">Ofertas</Navbar.Link>
            <Navbar.Link href="settings">Ajustes</Navbar.Link>
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
      {/* Job Post */}
      <div className="title" style={{ width: "100%", marginTop: "20px"}}>
        <h1 style={{ color: "white", textAlign: "center", fontSize: "45px" }}>Oferta de empleo: Se busca desarrollador junior</h1>
      </div>
      
      <div style={{ backgroundColor: "white", width: "89%", height: "auto", color: "black", padding: "20px", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "20px" }}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

        Traducci�n hecha por H. Rackham en 1914
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

        Traducci�n hecha por H. Rackham en 1914
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

      </div>
      <div style={{ backgroundColor: "white", width: "89%", height: "auto", color: "black", padding: "20px", marginTop: "20px", borderRadius: "20px"}}>
        <h2 style={{ color: "black", textAlign: "left" }}>Multimedia</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={styles.imageGallery}>
            <img className={styles.image} src="https://images.pexels.com/photos/3009793/pexels-photo-3009793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={styles.image} />
            <img className={styles.image} src="https://images.pexels.com/photos/7654179/pexels-photo-7654179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={styles.image} />
            <img className={styles.image} src="https://images.pexels.com/photos/7654179/pexels-photo-7654179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={styles.image} />
            <img className={styles.image} src="https://images.pexels.com/photos/7654179/pexels-photo-7654179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={styles.image} />
            <img className={styles.image} src="https://images.pexels.com/photos/7654179/pexels-photo-7654179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={styles.image} />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home