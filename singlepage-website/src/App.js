import { useEffect } from "react"
import GlobalStyle from "./GlobalStyles"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./compoents/Navbar/Navbar";
import Home from "./Pages/HomePage/Home";
import Services from "./Pages/Services/Services";
import Products from "./Pages/Products/Products";
import Login from "./Pages/login/login";
import Footer from "./compoents/Footer/Footer";
import ScrollToTop from "./compoents/ScrollToTop";

const getSessionGender = () => {
  let gender = sessionStorage.getItem("customerGender");
  if (!gender) {
    const options = ["men", "women", ""];
    gender = options[Math.floor(Math.random() * options.length)];
    sessionStorage.setItem("customerGender", gender);
  }
  return gender;
};

const getViewName = (pathname) => {
  if (pathname === "/") return "home";
  if (pathname === "/services") return "services";
  if (pathname === "/products") return "products";
  if (pathname === "/login") return "login";
  return "unknown";
};

function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    window.adobeDataLayer = window.adobeDataLayer || [];

    window.adobeDataLayer.push({
      event: "pageView",
      page: {
        viewName: getViewName(location.pathname),
        url: window.location.href
      },
      customer: {
        id: "CUST001",
        gender: getSessionGender()
      }
    });

    console.log("Pushed to adobeDataLayer:", window.adobeDataLayer[window.adobeDataLayer.length - 1]);
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
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;