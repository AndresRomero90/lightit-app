import { Suspense } from 'react';
import './App.css';
import { NavigationRouter } from './shared/components/NavigationRouter';
import Loader from './shared/components/Loader';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <NavigationRouter />
    </Suspense>
  );
}

export default App;
