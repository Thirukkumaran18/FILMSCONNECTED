import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import "../Style/Home.css"
import { getPopularMovies, searchMovies } from "../Services/api";
//import { useNavigate } from "react-router-dom";

//const userLoggedIn = localStorage.getItem("userCredentials");

function Home() {

    //const navigate = useNavigate()

    const [searchMovie, setSearchMovie] = useState("");
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchMovie.trim()) return; 

        setLoading(true);
        setError(null);

        try {
            const results = await searchMovies(searchMovie);
            if (results && results.length > 0) {
                setMovies(results);
            } else {
                setMovies([]);
                setError("No movies found.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to search movies.");
        } finally {
            setLoading(false);
        }
    };


    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect( () => {
        
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                console.log("c : ", popularMovies)
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, [])


    

    

    return (    
        <div className="home">
            
            <div className="searchForm">
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search movies..."
                        value={searchMovie}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchMovie(value);
                            if(value.trim() === ""){
                                getPopularMovies().then(setMovies)
                            }
                        }}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            {/* <div>
                <button onClick={handleLogOut}>signout</button>
            </div>     */}
            <div>
                {Array.isArray(movies) && movies.length > 0 ? (
                    <div className="movieGrid">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                ) : loading ? (
                    <p>Loading movies...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
            
        </div>
    )
}

export default Home;