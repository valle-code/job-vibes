import { useState } from 'react';
import type { NextPage } from 'next';
import { Navbar, Text, Button, Grid, Link } from '@nextui-org/react';
import JobOffer from '../components/Joboffers/JobOffer';
import Footer from '../components/Index/Footer';
import styles from './styles/joboffers.module.css';


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
      link: "joboffers"
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
    <div style={{ "height": "100vh", width: "100%" }}>
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
      {/* Cards */}
      <Grid.Container gap={2}>
        <>
          <div className={styles.postSection}>
            <div className={styles.commentBox}>
              <div className={styles.userAvatar}>
                <img className={styles.imgAvatar} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="Avatar del usuario" />
              </div>
              <div className={styles.commentForm}>
                <textarea className={styles.textarea} placeholder="Escribe tu comentario aquí"></textarea>
                <div className={styles.formActions}>
                  <button className={`${styles.btn} ${styles.btnPublish}`}>Publicar</button>
                </div>
              </div>
            </div>
          </div>
        </>
        <Grid xs={12} sm={3}>
          <JobOffer
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/3009793/pexels-photo-3009793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="3,500"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <JobOffer
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/7654179/pexels-photo-7654179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="1,000"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <JobOffer
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/5711267/pexels-photo-5711267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="5,000"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <JobOffer
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/5711267/pexels-photo-5711267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="5,000"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <JobOffer
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/5711267/pexels-photo-5711267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="5,000"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <JobOffer
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/5711267/pexels-photo-5711267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="5,000"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <JobOffer
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/5711267/pexels-photo-5711267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="5,000"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <JobOffer
            label="Nueva oferta de trabajo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://images.pexels.com/photos/5711267/pexels-photo-5711267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            candidateCount="5,000"
          />
        </Grid>
      </Grid.Container>
      {/* Footer */}
      <div style={{ width: "100%", backgroundColor: "white", marginRight: "30px" }}>
        <Footer />
      </div>

    </div>

  )
}

export default Home