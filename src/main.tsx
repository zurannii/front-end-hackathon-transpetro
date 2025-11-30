import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' /* O reset que criamos no passo 1 */
import './styles/variables.css' /* As variáveis de cor */
import './styles/global.css' /* Os estilos globais */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)