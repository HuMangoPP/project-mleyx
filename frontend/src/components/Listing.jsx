import { useEffect, useState } from "react";
import baseUrl from "../baseUrl";

export function Listing({ id, name, about, image }) {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    fetch(`${baseUrl}${image}`, { method: "GET" })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        return webkitURL.createObjectURL(blob);
      })
      .then((url) => {
        setImageSrc(url);
      });
  }, []);

  return (
    <div className="border rounded-3 border-2 mb-3 d-flex">
      <div className="w-25">
        <img
          src={imageSrc}
          alt="Jeffrey Xu (Turtlecuber)"
          className="img-fluid rounded"
        />
      </div>
      <div className="w-100 mx-3 pt-3">
        <h4>{name}</h4>
        <p>{about}</p>
      </div>
    </div>
  );
}
