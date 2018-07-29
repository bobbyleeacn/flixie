import React, { Component } from 'react'
import './App.css';
import ModalImage from 'react-modal-image'
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';


export default class MovieList extends Component {
  render() {
    return (
      <div>
        {this.props.movies.map(
          movie => <Movie key={movie.id} {...movie} />)
        }
      </div>
    )
  }
}

// <img src={`https://image.tmdb.org/t/p/w342${poster_path}`} style={{height: 300, objectFit: 'cover'}} alt="Card image cap" />       // small url
// <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w342${poster_path}`} style={{height: 200, objectFit: 'cover'}} alt="Card image cap" />
// Stateless React Component
// const Movie = (props) => {
// destructuring so we no longer have to use 'props.title' etc.
const Movie = ({title, overview, poster_path, release_date, vote_average}) => {
  return (
    <div className='cardContainer'>
      <div className='cardImage'>
        <ModalImage
          small={`https://image.tmdb.org/t/p/w342${poster_path}`}
          large={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
        />
      </div>
      <div className='cardText'> 
        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#3C3C3C' }}>
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{release_date}</CardSubtitle><br />
            <CardText>{overview}<br /><br />Rating: {vote_average}</CardText>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};