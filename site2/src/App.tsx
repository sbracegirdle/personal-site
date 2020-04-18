import React from 'react';
import {Root, addPrefetchExcludes} from 'react-static';
// import {Root, Routes, addPrefetchExcludes} from 'react-static';
// import {Router} from '@reach/router';
// import FancyDiv from 'components/FancyDiv';
// import Dynamic from 'containers/Dynamic';
import './styles.css';

import Main from './pages';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

//bg-purple-700

function App() {
  return (
    <Root>
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/dynamic">Dynamic</Link>
      </nav> */}
      <Main />

      {/* <div className="content">
        <FancyDiv>
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Dynamic path="dynamic" />
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </FancyDiv>
      </div> */}
    </Root>
  );
}

export default App;
