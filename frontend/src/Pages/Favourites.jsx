import { useEffect, useState } from "react";
import "../Style/Favourite.css"

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userCredentials"));
    if (!user) return;

    const fetchFavourites = async () => {
      try {
        const res = await fetch(`http://localhost:5000/favourite/${user._id}`);
        const data = await res.json();
        setFavourites(data);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    };

    fetchFavourites();
  }, []);

  const handleDelete = async (title) => {
    const user = JSON.parse(localStorage.getItem("userCredentials"));
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:5000/favourite/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, title }),
      });

      const data = await res.json();
      alert(data.message);

      // Update the frontend list
      setFavourites(prev => prev.filter(movie => movie.title !== title));
    } catch (err) {
      console.error("Error deleting favourite:", err);
    }
  }

  return (
    <div className="favouritesContainer">

      { favourites.length === 0 ? <>Add movies to your favourite</> :  favourites.map((movie, i) => (
        <div className="favouriteItem" key={i}>
          <img
            className="movieLogo"
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
          />
          <p className="movieTitle">{movie.title}</p>
          <input type="checkbox" className="watchedCheckbox" />
          <button onClick={() => handleDelete(movie.title)} className="deleteBtn" >🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default Favourites;
