import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Navbar, Text, Button, Grid, Link, Modal, useModal } from '@nextui-org/react';
import ReportData from '../components/Joboffers/Report';
import Footer from '../components/Index/Footer';
import styles from './styles/joboffers.module.css';
import axios from 'axios';
import Report from './api/Models/Report';
import User from "./api/Models/User";
import { useRouter } from 'next/router';
import PopUp from '../components/Global/PopUp';

const Home: NextPage = () => {

  const [reports, setReports] = useState<Report[]>([]);

  const [user, setUser] = useState<User | null>(null);
  const { setVisible, bindings } = useModal();
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

  const getReports = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getReports",
    })
      .then((res) => {
        const reportsData = res.data.map((row: any) => new Report(row.id, row.idPost, row.titleReport, row.descriptionReport, row.thumbnailJobPost, row.creationDateReport));
        setReports(reportsData);
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
        setUser(null); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePopupClose = () => {
    setVisible(false);
};


  useEffect(() => {
    getUser();
    getReports();
    console.log(reports.length);
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
      {/* Cards */}

      <Grid.Container gap={2}>

        {reports ? (
          reports.map((report) => (
            <Grid xs={12} sm={3}>
              <ReportData
                label={report.description}
                title={report.title}
                imageURL={report.thumbnail}
                candidateCount={"Publicado el " + report.creationDate.toString().substring(1, 10)}
                id = {report.idPost}
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