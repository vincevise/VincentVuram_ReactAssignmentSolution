import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MovieModel from "../../model/MovieModel";
import { addMovie,  deleteMovieById, getHigestMovieId, getMovieByTitle } from "../../services/movieService";
import Rating from "../common/Rating";
import './MovieListItem.css';


type Props = {
    movie: MovieModel
    path: string
    onRemove:(title:string) => void
};

const MovieListItem = ( { movie, path, onRemove } : Props ) => {
    const toastTimeout = 1000;
    const isFavouritePage = path === "favourite";

    const { id, title, storyline, ratings, posterurl, year, imdbRating } = movie;

    const average = (arr : number[]) => arr.reduce((a,b) => a + b, 0) / arr.length;
    var rating = parseInt(average(ratings).toFixed(2), 10) / 2;

    var redirectPath = `${path}/${title}`

    const addMovieToFavourite = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const movieByTitle = await getMovieByTitle("favourite", movie.title);
            if (movieByTitle !== null){
                toast.error("Already added in favourite!", { autoClose: toastTimeout })
                return;
            }

            const highestId = await getHigestMovieId("favourite");
            movie.id = highestId + 1;
            await addMovie("favourite", movie);
            toast.success("Successfully added in favourite!", { autoClose: toastTimeout })
        }
        catch (errormsg : any) {
            toast.error("Failed to add the movie!", { autoClose: toastTimeout })
        }
    };

    const removeMovieFromFavourite = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            if (movie.id === null){
                toast.warn("Deletion of a movie without id not implemented");
            }
            const data = await deleteMovieById("favourite", movie.id);
            toast.success("Successfully removed from favourite!", { autoClose: toastTimeout })
            onRemove(movie.title);
        }
        catch (errormsg : any) {
            toast.error("Failed to remove from favourite", { autoClose: toastTimeout })
        }
    };

   

    return (
        <Card className="card" style={{ width: '18rem' }} >
            <Link to={redirectPath}>
            <Card.Img variant="top" height={350} src={`${posterurl}`}  />
            </Link>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between d-flex-custom ">
                    <div className="text-xs">
                        {title}
                    </div>
                    <Card.Text>
                    <span >
                        {`Year: ${year}, IMDB: ${imdbRating}`}
                    </span>
                </Card.Text>
                    {/* <div>
                        <Link to={redirectPath}  className="btn btn-primary btn-sm">
                            More
                        </Link>
                    </div> */}
                    <div>
                    <Button hidden={isFavouritePage} onClick={addMovieToFavourite} variant="primary">Add to favourite 	&#10084;</Button>
                <Button hidden={!isFavouritePage} onClick={removeMovieFromFavourite} variant="danger">Remove from favourite</Button>
           
                    </div>
                </Card.Title>
                
                 </Card.Body>
        </Card>
    );
};

export default MovieListItem