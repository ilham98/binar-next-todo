import { useSelector } from "react-redux";

const Navbar = () => {
  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  return (
    <div>
      {authenticatedUser ? authenticatedUser.email : "User belum login"}
    </div>
  );
};

export default Navbar;
