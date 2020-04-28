import React, {useEffect} from 'react';
import {Root, Routes, addPrefetchExcludes} from 'react-static';
import {Router, globalHistory} from '@reach/router';
// import Dynamic from 'containers/Dynamic';
import './styles.css';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

// For un-breaking fragment links
let lastKnownHash: string = null;

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center bg-white">
      <div className="text-lg opacity-75 font-mono">
        <em>Loading...</em>
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    globalHistory.listen(({action, location}) => {
      if (action === 'PUSH') {
        if (location.hash !== lastKnownHash) {
          // Un-break fragment links
          lastKnownHash = location.hash;
          setTimeout(() => {
            window.location.hash = location.hash;
          }, 100);
        }
      }
    });
  }, []);

  return (
    <Root>
      <React.Suspense fallback={<Loading />}>
        <Router>
          {/* <Dynamic path="dynamic" /> */}
          <Routes path="*" />
        </Router>
      </React.Suspense>
    </Root>
  );
}

export default App;
