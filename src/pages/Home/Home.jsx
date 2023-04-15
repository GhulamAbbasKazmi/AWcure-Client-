import React from "react";
import { useParams } from "react-router-dom";

const Home = () => {
  const { userId, token } = useParams();

  console.log("userId", userId);
  console.log("token", token);

  return <>Home</>;
};
export default Home;
