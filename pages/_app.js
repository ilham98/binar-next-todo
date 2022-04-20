import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "../redux/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "../firebase/firebaseAuth";

const App = (props) => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return props.children;
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
