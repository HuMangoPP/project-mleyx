import date from 'date-and-time'

export function NewListingForm({ onSubmit, returnToHomepage }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.name.value === "") return;
    if (e.target.about.value === "") return;
    if (e.target.image.value === "") return;

    const formData = new FormData();
    formData.append("id", crypto.randomUUID());
    formData.append("name", e.target.name.value);
    formData.append("about", e.target.about.value);
    formData.append("timestamp", date.format(new Date(), "YYYY-MM-DD HH:mm:ss"));
    formData.append("image", e.target.image.files[0]);
    onSubmit(formData);
    returnToHomepage();
  };

  return (
    <>
      <div className="d-flex mx-5 my-3">
        <div className="me-auto fw-bold h2">Create a Listing</div>
        <button className="btn-close" onClick={returnToHomepage}></button>
      </div>
      <form onSubmit={handleSubmit} className="mx-5">
        <div className="mb-3 row">
          <label className="col-2 col-form-label fw-bold" htmlFor="name">
            School Name
          </label>
          <div className="col">
            <input className="form-control" type="text" id="name" />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label fw-bold" htmlFor="about">
            About
          </label>
          <div className="col">
            <textarea className="form-control" rows="5" id="about" />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label fw-bold" htmlFor="image">
            Image
          </label>
          <div className="col">
            <input
              className="form-control"
              type="file"
              accept="image/*"
              id="image"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary rounded-pill p-3">Submit</button>
        </div>
      </form>
    </>
  );
}
