import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainContextProvider } from './components/context/StateContext.jsx';
import Details from './components/details/index.jsx';
import Favorites from './components/favorites/index.jsx';
import { Home } from './components/home';
import Properties from './components/property/index.jsx';
import { AllViewings, ViewingRequests } from './components/viewing/index.jsx';

const App = () => {
  return (
    <Router>
      <MainContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewing" element={<AllViewings />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/my-properties" element={<Properties />} />
          <Route path="/viewing-requests" element={<ViewingRequests />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </MainContextProvider>
    </Router>
  );
};

export default App;
