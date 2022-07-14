import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Alert, Col, Row } from "react-bootstrap";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoading } from "../../utils/types";
import MovieModel from "../../model/MovieModel";
import LoadingIndicator from "../common/LoadingIndicator";
import Rating from "../common/Rating";
import { getMovieByTitle } from "../../services/movieService";
import NoMatch from "../global/NoMatch";
import './MovieInfo.css';
import { Link } from "react-router-dom";

type Props = {
    moviesCategory : string,
    path : string
}
const MoviesInfo = (props : RouteComponentProps<Props>) =>{
    const [status, setStatus] = useState<isLoading>("LOADING")
    const [movie, setMovie] = useState<MovieModel | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect( ()=>{
        const fetchMovie  = async () => {
            try{
                const data = await getMovieByTitle(props.match.params.moviesCategory, props.match.params.path);
                setMovie(data);
                setStatus("LOADED");
            }
            catch (errormsg : any) {
                setError(errormsg)
                setStatus("ERROR")
            }
        }

        fetchMovie();
    },[ props.match.params.path,  props.match.params.moviesCategory]) 

    let el

    switch (status) {
        case "LOADING":
            el = <LoadingIndicator size="large" message="Loading Libraries. Please wait...."/>;
            break;
        case "LOADED":
            
            if (movie === null){
                el = (
                    <NoMatch/>
                );
                break;
            }
            
            const { title, storyline, ratings, posterurl, duration } = movie as MovieModel;

            if (title === null){
                el = (
                    <NoMatch/>
                );
                break;
            }
            const average = (arr : number[]) => arr.reduce((a,b) => a + b, 0) / arr.length;
            var rating = parseInt(average(ratings).toFixed(2), 10) / 2;
            el = (
                <>
                    <Row>
                    <Col xs={12} className="my-2 bt-head">
                        <Link to={{pathname: `/${props.match.params.moviesCategory}`}}>
                            <h6>Back to Home</h6>
                        </Link>
                        </Col>
                        <Col xs={12} className="my-2">
                            <h1>{title}</h1>
                        </Col>
                        <Col xs={12} lg={4} className="my-2">
                            <img src={`${posterurl}`}
                                alt={title}
                                className="w-100"
                            />
                        </Col>
                        <Col xs={12} lg={8}>
                            <div className="fs-5 my-2 st-details">{storyline}</div>
                            <Row xs={3} className="text-sm my-2">
                                <Col>
                                    <FontAwesomeIcon icon={faClock} />
                                    <span className="ms-2">{duration}</span>
                                </Col>
                                <Col>
                                    <Rating rating={rating}/>
                                    {rating} ({ratings.length} rated)
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )
            break;

        case "ERROR":
            let msg = error?.message??'';

            if (msg?.indexOf("404") > -1){
                el = (
                    <NoMatch/>
                )
            } else {
                el = (
                    <Alert variant="danger">
                        {error?.message}
                    </Alert>
                )                
            }
            break;
    }

    return el;
}

export default MoviesInfo