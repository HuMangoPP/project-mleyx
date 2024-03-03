import { useEffect, useState } from "react";
import { NewListingForm } from "./components/NewListingForm";
import { EditListingForm } from "./components/EditListingForm";
import { Listings } from "./components/Listings";
import baseUrl from "./baseUrl";

function App() {
  const [creatingNewListing, setCreatingNewListing] = useState(false);
  const [editing, setEditing] = useState({});
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
    fetch(`${baseUrl}/new`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        getListings();
      }
    });
  };

  const editListing = (formData) => {
    fetch(`${baseUrl}/edit`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        getListings();
      }
    });
  }

  const returnToHomepage = () => {
    setCreatingNewListing(false);
    setEditing({});
  };

  const isEditing = () => {
    return Object.keys(editing).length !== 0
  }

  return (
    <>
      {creatingNewListing ? (
        <NewListingForm
          onSubmit={addNewListing}
          returnToHomepage={returnToHomepage}
        />
      ) : (
        <>
          {isEditing() ? (
            <EditListingForm
              onSubmit={editListing}
              returnToHomepage={returnToHomepage}
              listing={editing}
            />
          ) : (
            <div className="d-flex justify-content-center mt-3">
              <Listings listings={listings} beginEdit={setEditing}/>
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
      )}
    </>
  );
}

export default App;
