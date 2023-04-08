import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type CommentProps = {
  nombre: string;
  fotoPerfil: string;
  comentario: string;
  fecha: string;
}

function Comment(props: CommentProps) {
  return (
    <div className="d-flex flex-start mb-4">
  <img className="rounded-circle shadow-1-strong me-3"
    src={props.fotoPerfil} alt="avatar" width="60"
    height="60" />
  <div>
    <h6 className="fw-bold mb-1">{props.nombre}</h6>
    <div className="d-flex align-items-center mb-3">
      <p className="mb-0">
        {props.fecha}
      </p>
      <a href="#!" className="link-muted"><i className="fas fa-pencil-alt ms-2"></i></a>
      <a href="#!" className="link-muted"><i className="fas fa-redo-alt ms-2"></i></a>
      <a href="#!" className="link-muted"><i className="fas fa-heart ms-2"></i></a>
    </div>
    <p className="mb-0">
      {props.comentario}
    </p>
  </div>
</div>

  );
}

export default Comment;
