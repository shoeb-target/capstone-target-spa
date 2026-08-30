
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
import Footer from "./compoents/Footer/Footer";
import ScrollToTop from "./compoents/ScrollToTop";

function RouteChangeTracker() {
  const location = useLocation();

  const getViewName = (pathname) => {
    if (pathname === "/") return "home";
    if (pathname === "/services") return "services";
    if (pathname === "/products") return "products";
    return "unknown";
  };

  useEffect(() => {
    const trySendEvent = (retries = 10) => {
      if (window.alloy) {
        window.alloy("sendEvent", {
          renderDecisions: true,
          xdm: {
            eventType: "web.webpagedetails.pageViews",
            web: {
              webPageDetails: {
                viewName: getViewName(location.pathname),
                URL: window.location.href
              }
            }
          }
        });
      } else if (retries > 0) {
        setTimeout(() => trySendEvent(retries - 1), 200);
      } else {
        console.log("alloy never became available");
      }
    };

    trySendEvent();
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
