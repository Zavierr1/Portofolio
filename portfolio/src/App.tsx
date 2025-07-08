import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div id="root">
      <section className="section" style={{ textAlign: 'center', border: 'none', boxShadow: 'none', background: 'none', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--accent)', margin: 0 }}>Hi, I'm <span style={{ color: 'var(--text)' }}>Your Name</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>
          Modern Minimalist Portfolio
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">About Me</h2>
        <div className="section-content">
          <p>
            I am a passionate developer specializing in building modern, responsive web applications with a focus on clean design and great user experience. I love working with TypeScript, React, and the latest web technologies.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Projects</h2>
        <div className="section-content">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--accent)' }}>Project One</strong>
              <p style={{ margin: '0.3rem 0', color: 'var(--text-muted)' }}>
                A brief description of your project, what it does, and the technologies used.
              </p>
              <a href="#" target="_blank" rel="noopener noreferrer">View Project</a>
            </li>
            <li>
              <strong style={{ color: 'var(--accent)' }}>Project Two</strong>
              <p style={{ margin: '0.3rem 0', color: 'var(--text-muted)' }}>
                Another project description goes here. Keep it concise and clear.
              </p>
              <a href="#" target="_blank" rel="noopener noreferrer">View Project</a>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Contact</h2>
        <div className="section-content">
          <p>
            Feel free to reach out via email:
            <br />
            <a href="mailto:your.email@example.com">your.email@example.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default App
