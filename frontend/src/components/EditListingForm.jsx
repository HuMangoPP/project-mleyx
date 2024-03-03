import date from "date-and-time";
import { useState } from "react";

export function EditListingForm({ onSubmit, returnToHomepage, listing }) {
  const [name, setName] = useState(listing.name);
  const [about, setAbout] = useState(listing.about);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") return;
    if (about === "") return;

    const formData = new FormData();
    formData.append("id", listing.id);
    formData.append("name", name);
    formData.append("about", about);
    formData.append(
      "timestamp",
      date.format(new Date(), "YYYY-MM-DD HH:mm:ss")
    );
    if (e.target.image.value !== "") {
      formData.append("image", e.target.image.files[0]);
    }
    onSubmit(formData);
    returnToHomepage();
  };

  return (
    <>
      <div className="d-flex mx-5 my-3">
        <div className="me-auto fw-bold h2">Edit Listing</div>
        <button className="btn-close" onClick={returnToHomepage}></button>
      </div>
      <form onSubmit={handleSubmit} className="mx-5">
        <div className="mb-3 row">
          <label className="col-2 col-form-label fw-bold" htmlFor="name">
            School Name
          </label>
          <div className="col">
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-2 col-form-label fw-bold" htmlFor="about">
            About
          </label>
          <div className="col">
            <textarea
              className="form-control"
              rows="5"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              id="about"
            />
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
