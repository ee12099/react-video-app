import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VideoPlayer from './containers/VideoPlayer'
import registerServiceWorker from './registerServiceWorker';
import ListItem from "./components/ListItem";
import ListView from "./containers/ListView";
import SlideView from "./containers/SlideView";

ReactDOM.render(<SlideView/>, document.getElementById('root'));
registerServiceWorker();
