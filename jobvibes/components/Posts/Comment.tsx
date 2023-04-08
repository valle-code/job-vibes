import React from 'react';

type CommentProps = {
  nombre: string;
  fotoPerfil: string;
  comentario: string;
  fecha: string;
}

function Comment(props: CommentProps) {
  const styles = {
    comentario: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    fotoPerfil: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginRight: '10px',
    },
    contenido: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    nombre: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    texto: {
      fontSize: '14px',
      marginBottom: '5px',
    },
    fecha: {
      fontSize: '12px',
      color: 'gray',
    },
  };

  return (
    <div style={styles.comentario}>
      <div style={styles.fotoPerfil}>
        <img src={props.fotoPerfil} alt="Foto de perfil" />
      </div>
      <div style={styles.contenido}>
        <div style={styles.nombre}>{props.nombre}</div>
        <div style={styles.texto}>{props.comentario}</div>
        <div style={styles.fecha}>{props.fecha}</div>
      </div>
    </div>
  );
}

export default Comment;
