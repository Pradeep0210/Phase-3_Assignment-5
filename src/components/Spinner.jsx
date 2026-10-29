function Spinner() {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Loading recipes...</p>
    </div>
  );
}

export default Spinner;