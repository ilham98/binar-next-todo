import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { attemptAuth, updateCredentials } from "../redux/slices/authSlice";
import Guest from "../middlewares/Guest";

function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onInputChange = (event) => {
    dispatch(
      updateCredentials({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(attemptAuth(auth.form));
  };

  return (
    <Guest>
      <Navbar />
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input onChange={onInputChange} name="email" />
        </div>
        <div>
          <label>Password</label>
          <input onChange={onInputChange} name="password" />
        </div>
        <div>
          <button type="submit" disabled={auth.isLoading}>
            Login
          </button>
        </div>
      </form>
    </Guest>
  );
}

export default Login;
