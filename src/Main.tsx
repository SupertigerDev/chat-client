import { render } from 'preact'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import './index.css'

render(<BrowserRouter><Router /></BrowserRouter>, document.getElementById('app')!)
