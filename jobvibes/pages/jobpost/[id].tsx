import { useState, useEffect } from "react";
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Navbar, Text, Button, Grid, Col, Link } from '@nextui-org/react';
import styles from '../styles/jobpost.module.css';
import Comment from '../../components/Posts/Comment';
import User from "../api/Models/User";
import JobOfferData from '../api/Models/JobOffer';
import CommentData from '../api/Models/Comment';
import axios from 'axios';

const Home: NextPage = () => {

  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [jobOffer, setJobOffer] = useState<JobOfferData | null>(null);
  const [comments, setComments] = useState<CommentData[] | null>(null);
  const [comment, setComment] = useState<string>("");
  const [images, setImages] = useState<{ image_id: number, url: string }[]>([]);



  interface CollapseItem {
    name: string;
    link: string;
  }

  const getAllPostData = (id: string) => {
    axios({
      method: "get",
      withCredentials: true,
      url: `http://localhost:3001/getJobOffer/${id}`,
    })
      .then((res) => {
        console.log(res);
        const imagesData = res.data.images;
        console.log("Hola" + imagesData);
        console.log(imagesData[0].url);
        console.log(imagesData.length);
        const jobOffer = new JobOfferData(res.data.id, res.data.title, res.data.description, res.data.thumbnail, res.data.jobDetails, res.data.creationDate);
        setJobOffer(jobOffer);
        setImages(imagesData);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const getJobComments = (id: string) => {
    axios({
      method: "get",
      withCredentials: true,
      url: `http://localhost:3001/getJobComments/${id}`,
    })
      .then((res) => {
        console.log(res);
        const commentsData = res.data.map((row: any) => new CommentData(row.comment, row.user, row.role, row.creationDate));
        setComments(commentsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  const postComment = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:3001/postComment",
      data: {
        content: comment,
        postId: jobOffer?.id,
        userId: user?.id,
      },
    })
      .then(() => {
        console.log("Comentario enviado");
        getJobComments(id as string);
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

  useEffect(() => {
    // Llamada a la función getUser al cargar el componente
    getUser();
    if (typeof id === 'string') {
      getAllPostData(id);
      getJobComments(id);
    }
  }, [id]);


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
            <Text b color="inherit" hideIn="xs" css={{ marginLeft: "30px" }}>
              <Link css={{ color: "Black" }} href="/">
                JobVibes
              </Link>
            </Text>
          </Navbar.Brand>
          <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
            <Navbar.Link href="#">Estadísticas</Navbar.Link>
            <Navbar.Link href="/joboffers">Ofertas</Navbar.Link>
            <Navbar.Link href="/settings">Ajustes</Navbar.Link>
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
                <Navbar.Link color="inherit" href="/login">
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
      {/* Job Post */}
      <div className="title" style={{ width: "100%", marginTop: "20px" }}>
        <h1 style={{ color: "white", textAlign: "center", fontSize: "45px" }}>{jobOffer?.jobTitle}</h1>
      </div>

      <div style={{ backgroundColor: "white", width: "89%", height: "auto", color: "black", padding: "20px", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "20px" }}>
        {jobOffer?.jobDetails}
      </div>
      <div style={{ backgroundColor: "white", width: "89%", height: "auto", color: "black", padding: "20px", marginTop: "20px", borderRadius: "20px" }}>
        <h2 style={{ color: "black", textAlign: "left" }}>Multimedia</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.imageGallery}>
            {images ? (images.map(image => (
              console.log(image),
              <img key={image.image_id} className={styles.image} src={image.url} alt={styles.image} />
            ))) : <p>No hay imágenes</p>}
          </div>

        </div>
      </div>
      <div className="title" style={{ width: "89%", marginTop: "20px" }}>
        <h1 style={{ color: "white", textAlign: "left", fontSize: "30px" }}>Comentarios</h1>
      </div>
      <div style={{ backgroundColor: "white", width: "89%", height: "auto", color: "black", padding: "20px", marginTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center", borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}>
        <div className={styles.postSection}>
          <div className={styles.commentBox}>
            <div className={styles.userAvatar}>
              <img className={styles.imgAvatar} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="Avatar del usuario" />
            </div>
            <div className={styles.commentForm}>
              <textarea className={styles.textarea} placeholder="Escribe tu comentario aquí" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
              <div className={styles.formActions}>
                <button className={`${styles.btn} ${styles.btnPublish}`} onClick={() => postComment()}>Publicar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="commentSection">
          {comments ? (
            comments.map((comment) => (
              <Comment
                nombre={comment.user}
                fotoPerfil="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
                comentario={comment.comment}
                fecha={comment.creationDate.toString().substring(0, 10)}
              />
            ))
          ) : (
            <p>No hay comentarios para mostrar</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default Home