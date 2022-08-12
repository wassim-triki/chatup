import React from 'react';
import Spinner from './Spinner';
import { ThreeDots } from 'react-loader-spinner';
const FormButton = ({ loading, children, loadingText }) => {
  return (
    <button
      disabled={loading}
      type="submit"
      className="btn-primary flex gap-2 items-center transition-all duration-200 "
    >
      {loading ? (
        <>
          <ThreeDots color="#fff" height={30} width={30} />
          {/* {loadingText} */}
        </>
      ) : (
        <> {children}</>
      )}
    </button>
  );
};

export default FormButton;
