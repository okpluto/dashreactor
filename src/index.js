// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
// import './index.css';

// import LessonTitleList from './LessonTitleCardList';
// import Navbar from './Navbar';


// ReactDOM.render((
//   <Router history={browserHistory}>
//     <Route path='/' component={App}>
//       <Route component={Navbar} />
//       {/*<Route path="nav" component={Navbar} />*/}
//       <Route component={LessonTitleList} />
//     </Route>
//   </Router>
//   ), document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
