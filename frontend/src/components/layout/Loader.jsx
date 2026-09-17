function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader-spinner" aria-hidden="true" />
      <span className="loader-label">Loading...</span>
    </div>
  );
}

export default Loader;
