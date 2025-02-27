const LoadingSpinner = () => {
  return (
    <>
      {" "}
      {/* <h2 classNameName="LoadingSpinner">Loading...</h2> */}
      <div className="d-flex justify-content-center LoadingSpinner">
        <div
          className="spinner-border"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};
export default LoadingSpinner;
