import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styles from './styles/verification.module.css';


const Register: NextPage = () => {
  const preguntas = [
    '¿Cuál es tu color favorito?',
    '¿Cuál es tu animal favorito?',
    '¿Cuál es tu comida favorita?',
    '¿Cuál es tu canción favorita?',
    '¿Cuál es tu película favorita?',
    '¿Cuál es tu libro favorito?',
    '¿Cuál es tu ciudad favorita?',
    '¿Cuál es tu deporte favorito?',
    '¿Cuál es tu hobby favorito?',
    '¿Cuál es tu personaje histórico favorito?'
  ];

  const [preguntaActual, setPreguntaActual] = useState<string>('');

  const setRandomQuestion = (preguntas: string[]): string => {
    const randomQuestion = Math.floor(Math.random() * preguntas.length);
    return preguntas[randomQuestion];
  };

  useEffect(() => {
    setPreguntaActual(setRandomQuestion(preguntas));
  }, [preguntas]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>No tan rápido...</h1>
        <h2 className={styles.subtitle}>{preguntaActual}</h2>
        <div className={styles.form}>
          <div className={styles.textinput}>
            <input className={styles.input} type="text" placeholder="Responde a la pregunta" />
            <button className={styles.button}><a href="/">Enviar</a></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
