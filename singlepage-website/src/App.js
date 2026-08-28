
import { useEffect } from "react"
import GlobalStyle from "./GlobalStyles"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import Navbar from "./compoents/Navbar/Navbar";
import Home from "./Pages/HomePage/Home";
import Services from "./Pages/Services/Services";
import Products from "./Pages/Products/Products";
import Footer from "./compoents/Footer/Footer";
import ScrollToTop from "./compoents/ScrollToTop";

function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    const trySatelliteTrack = (retries = 10) => {
      if (window._satellite) {
        window._satellite.track("routeChange");
      } else if (retries > 0) {
        setTimeout(() => trySatelliteTrack(retries - 1), 200);
      } else {
        console.log("_satellite never became available");
      }
    };

    trySatelliteTrack();
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <RouteChangeTracker />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
