import * as React from "react";

const ErrorInputText = ({ errorMsg }: any) => {
  return <span className="text-redErrorColor text-small absolute">{errorMsg}</span>;
};

export default ErrorInputText;
