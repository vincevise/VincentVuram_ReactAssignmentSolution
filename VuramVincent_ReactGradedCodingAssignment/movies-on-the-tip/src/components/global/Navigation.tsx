import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


const Navigation = () => {
    return (
        <>
            <Navbar bg="light" expand="lg" className='border border-secondary'>
                <Container >
                    {/* <Navbar.Brand to="/" as={NavLink} exact>
                        <FontAwesomeIcon icon={faVideoCamera} className="me-2" />
                        Home
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-links" /> */}
                    <Navbar.Collapse id="main-links">
                        <Nav>
                            <Nav.Link to="/movies-in-theaters" as={NavLink}>Movies in theaters</Nav.Link>
                            <Nav.Link to="/movies-coming" as={NavLink}>Coming Soon</Nav.Link>
                            <Nav.Link to="/top-rated-india" as={NavLink}>Top Rated Indian</Nav.Link>
                            <Nav.Link to="/top-rated-movies" as={NavLink}>Top Rated Movies</Nav.Link>
                            <Nav.Link to="/favourite" as={NavLink}>Favourite</Nav.Link> 
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};

export default Navigation;