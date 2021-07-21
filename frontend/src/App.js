import Header from  './components/home/Header'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'

function App() {
  return (
    <Router >
      <Header />
    </Router>
  );
}

export default App;
