
import "../Style/MovieCard.css"
import { useNavigate } from "react-router-dom";


function MovieCard({ movie }) {

  const navigate = useNavigate();

  const addToFavourite = async (req, res) => {
    const user = JSON.parse(localStorage.getItem("userCredentials"));
    if (!user || !user._id) {
      console.log("you should log");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/favourite/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          title: movie.title,
          posterPath: movie.poster_path
        }),
      });

      const data = await res.json();
      console.log(data);
      alert(data.message);
    } catch (err) {
      console.error(err);
    }

  }

  const handleComments = () => {
    navigate("/comments",{
      state : {movieName : movie.title}
    });
  }

  return (
    <div className="movieCard">
      <div className="movieCardTop">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/180x260?text=No+Image"
          }
          alt={movie.title}
        />
      </div>
          
      <div className="movieDetails">
        <p className="title">{movie.title}</p>
        <p className="release">{movie.release_date?.slice(0, 4)}</p>
        <div className="buttonGroup">
          <button onClick = {handleComments} className="cmntBtn">Comments</button>
          <button onClick={addToFavourite} className="favBtn">Favourite</button>
        </div>

      </div>
    </div>
  );
}

export default MovieCard;
