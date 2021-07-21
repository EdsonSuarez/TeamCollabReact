import Routes from "./routes";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { projectGet } from './actions/project';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectGet());
  }, []);

  return (
    <Routes />
  );
}

export default App;
