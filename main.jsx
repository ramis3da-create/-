import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/modern-products.css'
// import './styles/store-background.css' // ملف غير موجود - تم التعليق
import { I18nProvider } from './i18n.jsx'
import { UserProvider } from './contexts/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </I18nProvider>
  </React.StrictMode>
)