import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Navbar, Text, Button, Grid, Link } from '@nextui-org/react';
import JobOffer from '../components/Joboffers/JobOffer';
import Footer from '../components/Index/Footer';
import styles from './styles/joboffers.module.css';
import axios from 'axios';
import JobOfferData from './api/Models/JobOffer';
import User from "./api/Models/User";
import { useRouter } from 'next/router';


const Home: NextPage = () => {

  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [jobDetails, setJobDetails] = useState<string>('');
  const [jobOffers, setJobOffers] = useState<JobOfferData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getUser",
    })
      .then((res) => {
        const userData = res.data;
        const usuario = new User(userData.id, userData.username, userData.password, userData.email, userData.userRole, userData.adminRole, userData.bannedRole);
        console.log(usuario.username, usuario.password)
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

  let jobOfferDataList: JobOfferData[] = [];

  const postJobOffer = () => {
    if (!user) {
      router.push('/login');
    } else {
      axios({
        method: 'post',
        data: {
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          jobDetails: jobDetails
        },
        withCredentials: true,
        url: 'http://localhost:3001/joboffers'
      }).then((res) => {
        console.log(res);
        getJobOffers();
        setJobDetails('');
        setJobDescription('');
        setJobTitle('');
      }).catch((err) => {
        console.log(err);
      });
    }

  }

  const getJobOffers = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getJobOffer",
    })
      .then((res) => {
        const jobOffersData = res.data.map((row: any) => new JobOfferData(row.id, row.title, row.description, row.jobDetails, row.creationDate));
        setJobOffers(jobOffersData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const logout = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    })
      .then(() => {
        setUser(null); // or any other way you manage user authentication state
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
    getJobOffers();
    console.log(jobOffers.length);
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
      {/* Cards */}

      <>
        <div className={styles.postSection}>
          <div className={styles.commentBox}>
            <div className={styles.userAvatar}>
              <img className={styles.imgAvatar} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="Avatar del usuario" />
            </div>
            <div className={styles.commentForm}>
              <div className={styles.textinput}>
                <input className={styles.input} type="text" name="title" placeholder="Escribe el titulo" onChange={e => setJobTitle(e.target.value)}></input>
              </div>
              <div className={styles.textinput}>
                <input className={styles.input} type="text" name="description" placeholder="Escribe una pequeña descripción" onChange={e => setJobDescription(e.target.value)}></input>
              </div>
              <textarea className={styles.textarea} name="detailsBox" placeholder="Escribe tu oferta aquí" onChange={e => setJobDetails(e.target.value)}></textarea>
              <div className={styles.formActions}>
                <button type="button" onClick={() => postJobOffer()} className={`${styles.btn} ${styles.btnPublish}`}>Publicar</button>
              </div>
            </div>
          </div>
        </div>
      </>


      <Grid.Container gap={2}>

        {jobOffers ? (
          jobOffers.map((jobOffer) => (
            <Grid xs={12} sm={3}>
              <JobOffer
                label={jobOffer.jobDescription}
                title={jobOffer.jobTitle}
                imageURL="https://images.pexels.com/photos/3009793/pexels-photo-3009793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                candidateCount={"Publicado el " + jobOffer.creationDate.toString().substring(1, 10)}
                id = {jobOffer.id}
              />
            </Grid>
          ))
        ) : null}






      </Grid.Container>
      {/* Footer */}
      <div style={{ width: "100%", backgroundColor: "white", marginRight: "30px" }}>
        <Footer />
      </div>

    </div>

  )
}

export default Home