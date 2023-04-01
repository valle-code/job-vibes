import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>Todos los derechos reservados.</p>
      <ul style={styles.footerLinks}>
        <li><a href="#" style={styles.footerLink}>Términos y condiciones</a></li>
        <li><a href="#" style={styles.footerLink}>Política de privacidad</a></li>
        <li><a href="#" style={styles.footerLink}>Política de cookies</a></li>
        <li><a href="#" style={styles.footerLink}>Aviso legal</a></li>
      </ul>
    </footer>
  );
}

const styles = {
  footer: {
    padding: '20px',
    textAlign: 'center',
    color: "black"
  },
  footerText: {
    fontSize: '14px',
    marginBottom: '10px',
  },
  footerLinks: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  footerLink: {
    color: '#333',
    fontSize: '14px',
    textDecoration: 'none',
    marginRight: '10px',
  },
  
};

export default Footer;
