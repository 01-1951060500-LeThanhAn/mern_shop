import { useSelector } from "react-redux";

const useFakeUser = () => {
  const { user } = useSelector((state) => state);
  const currentUser = user?.currentUser;

  return { currentUser };
};

export default useFakeUser;
