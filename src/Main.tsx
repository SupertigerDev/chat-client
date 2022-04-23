import { render } from 'preact'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import './index.css'
import 'material-icons/iconfont/round.scss';

render(<BrowserRouter><Router /></BrowserRouter>, document.getElementById('app')!)
