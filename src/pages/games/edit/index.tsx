import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Edit = () => {
  const { id } = useParams();

  function fetchGame() {}

  useEffect(() => {
    fetchGame();
  }, [id]);

  return <>Edit: {id}</>;
};

export default Edit;
