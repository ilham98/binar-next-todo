import { Provider, useDispatch } from "react-redux";
import "../styles/globals.css";
import store from "../redux/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "../firebase/firebaseAuth";
import { updateAuthenticatedUser, logout } from "../redux/slices/authSlice";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(
          updateAuthenticatedUser({
            email: user.email,
          })
        );
      }
    });
  }, []);

  return props.children;
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <App>
        <Component {...pageProps} />
      </App>
    </Provider>
  );
}

export default MyApp;
