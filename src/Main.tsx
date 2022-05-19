import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import './index.css'
import 'material-icons/iconfont/round.scss';

ReactDOM.createRoot(document.getElementById('app')!).render(<React.StrictMode><BrowserRouter><Router /></BrowserRouter></React.StrictMode>)
