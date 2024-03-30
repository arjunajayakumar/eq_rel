import { Circles } from "react-loader-spinner";

const LoaderSpinner = (): JSX.Element => {
  return (
    <>
      <Circles height="80" width="80" color="rgb(33, 189, 122)" ariaLabel="loading" />
    </>
  );
};

export default LoaderSpinner;
