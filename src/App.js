import logo from "./logo.svg";
import styles from "./App.module.css";
import Home from "./pages/homepage";
import Categories from "./pages/categories";
import GoogleLogin from "./components/login";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <GoogleLogin />
          <div className={styles.sellButton}>Sell</div>
        </div>
      </div>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/categories" component={Categories} />
      </div>
    </div>
  );
}

export default App;
