import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const onSignOutClick = async () => {
    await dispatch(logout());
  };

  return (
    <div>
      {authenticatedUser ? authenticatedUser.email : "User belum login"}
      {authenticatedUser && (
        <button disabled={auth.isSignOutLoading} onClick={onSignOutClick}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
