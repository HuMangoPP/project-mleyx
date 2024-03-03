export function Listing({ id, name, about, image, beginEdit }) {
  return (
    <div className="border rounded-3 border-2 mb-3 d-flex">
      <div className="w-25">
        <img src={image} alt="School Image" className="img-fluid rounded" />
      </div>
      <div className="w-100 mx-3 pt-3">
        <h4>{name}</h4>
        <p>{about}</p>
      </div>
      <div className="m-3">
        <button className="btn btn-secondary" onClick={() => {
          beginEdit({
            id,
            name,
            about
          })
        }}>Edit</button>
      </div>
    </div>
  );
}
