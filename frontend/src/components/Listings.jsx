import { Listing } from "./Listing";

export function Listings({ listings }) {
  return (
    <div className="w-50 mx-3">
      <h1 className="mb-3">Listings</h1>
      <div className="">
        {listings.length === 0 && (
          <p className="lead text-muted">No Listings Found</p>
        )}
        {listings.map((listing) => (
          <Listing {...listing} key={listing.id} />
        ))}
      </div>
    </div>
  );
}
