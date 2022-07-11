import React from 'react';
import Spinner from './Spinner';
const FormButton = ({ loading, children, loadingText }) => {
  return (
    <button
      disabled={loading}
      type="submit"
      className="btn-primary flex gap-2 items-center transition-all duration-200 mt-7"
    >
      {loading ? (
        <>
          <Spinner />
          {loadingText}
        </>
      ) : (
        <> {children}</>
      )}
    </button>
  );
};

export default FormButton;
