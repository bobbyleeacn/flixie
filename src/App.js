import React, { Component } from 'react';
import './App.css';
import { Container, Fade, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MovieList from './MovieList';
import NavBar from './NavBar';
import Gallery from './Gallery';
import Spinner from 'react-spinkit';
// import TEST_DATA from './now_playing.json';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesCopy: [],
      isLoading: true,
      galleryView: false,
      fadeIn: true,
      modal: false,
      modalMovie: {}
    }
  }

  async componentDidMount() {
    // await new Promise(resolve => setTimeout(resolve, 5000));   // activate to test spinner only
    this.fetchData();
  };

  fetchData() {
    let url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=5a884e8cc149705048e256ab1d7bd555&page=4'
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({movies: data.results, moviesCopy: data.results, isLoading: false}));
  }

  filterMovies(text) {
    let moviesCopy = this.state.moviesCopy;
    let results = moviesCopy.filter( movie => movie.title.toLowerCase().includes(text.toLowerCase()))
    this.setState({
      movies: results
    });
  }


  sortBy(property) {
    const sortedMovies = this.state.movies;
    if (property==='popularity') {
      sortedMovies.sort((a, b) => {return b.popularity - a.popularity});
    } else if (property==='vote_average') {
      sortedMovies.sort((a, b) => {return b.vote_average - a.vote_average});
    } else {
      sortedMovies.sort((a, b) => {return (b.release_date < a.release_date) ? -1 : ((b.release_date > a.release_date) ? 1 : 0)});
    }
   
    this.setState({ 
      movies: sortedMovies
    });
  }

  changeView() {
    let viewMode = !this.state.galleryView;
    this.setState({
      galleryView: viewMode
    });
  }

  toggleFade() {
    this.setState({
        fadeIn: !this.state.fadeIn
    });
  }

  toggleModal(movieId) {
    const modalMovie = this.state.movies.find(movie => {return movie.id === movieId})
    this.setState({
      modal: !this.state.modal,
      modalMovie: modalMovie
    });
  }

  closeModal(){
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div className="App">
        <Container style={{width: '50%'}}>
          {this.state.isLoading ? <div><Spinner name="line-scale-pulse-out-rapid" color="coral"/>Loading ... </div> :
            <div>
              <div className='header'>
                <NavBar 
                  handleSearch={searchText => this.filterMovies(searchText)}
                  handleFetch={()=>this.fetchData()}
                  sortByClick={(property) => this.sortBy(property)}
                  changeView={()=> this.changeView()}
                  galleryView={this.state.galleryView}
                  toggleFade={()=> this.state.toggleFade}
                />
              </div>
              <div>
                <ModalGallery isOpen={this.state.modal} close={()=>this.closeModal()} modalMovie={this.state.modalMovie} />
              </div>
              {this.state.galleryView ? 
                <div> <br /><br /><br /><br /><Fade in={this.state.fadeIn} tag="h5" className="mt-3"><Gallery movies={this.state.movies} toggleModal={(movieId)=>this.toggleModal(movieId)}/></Fade> </div> :
                <div><br /><br /><Fade in={this.state.fadeIn} tag="h5" className="mt-3"><MovieList movies={this.state.movies}/></Fade></div>
              }
              {!this.state.movies.length ? <span>Sorry no matches found.</span> : ''}
            </div>
          }
        </Container>
      </div>
    );
  }
}

// function component for gallery view pop-ups
const ModalGallery = (props) => {
  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={()=>props.close()} contentClassName='modal-content'>
        <ModalHeader toggle={()=>props.close()}>{props.modalMovie.title}</ModalHeader>
        <ModalBody >
          <div className='modalContainer'>
            <div className='modalImg'><img src={`https://image.tmdb.org/t/p/w342${props.modalMovie.poster_path}`} alt='' height='300px' width='200px'/></div>
            <div className='modalText'> {props.modalMovie.overview}</div>
          </div>
        </ModalBody>
        <ModalFooter>
          Release Date: {props.modalMovie.release_date}
        </ModalFooter>
      </Modal>
    </div>
  )
}

