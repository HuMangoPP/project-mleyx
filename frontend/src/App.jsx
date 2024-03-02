import { useEffect, useState } from "react";
import { NewListingForm } from "./components/NewListingForm";
import { Listings } from "./components/Listings";
import baseUrl from "./baseUrl";

function App() {
  const [creatingNewListing, setCreatingNewListing] = useState(false);
  const [listings, setListings] = useState([]);

  const getListings = () => {
    fetch(baseUrl, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setListings(data);
      });
  };

  useEffect(() => {
    getListings();
  }, []);

  const addNewListing = (formData) => {
    fetch(baseUrl, {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        getListings();
      }
    });
  };

  const returnToHomepage = () => {
    setCreatingNewListing(false);
  };

  return (
    <>
      {creatingNewListing ? (
        <NewListingForm
          onSubmit={addNewListing}
          returnToHomepage={returnToHomepage}
        />
      ) : (
        <div className="d-flex justify-content-center mt-3">
          <Listings listings={listings} />
          <div className="mx-3">
            <button
              onClick={(e) => setCreatingNewListing(true)}
              className="btn btn-primary"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
