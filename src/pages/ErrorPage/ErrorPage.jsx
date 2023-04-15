import React from "react";
import "./ErrorPage.css";

import errorPage from "../../assets/404 Error.png";

const ErrorPage = () => {
  return (
    <div className="Error-Page-Main">
      <img className="error-image" src={errorPage} />
    </div>
  );
};
export default ErrorPage;
