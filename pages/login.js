import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { attemptAuth, updateCredentials } from "../redux/slices/authSlice";

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
    <>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;
