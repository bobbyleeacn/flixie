import React, { Component } from 'react'
import { Fade } from 'reactstrap';


export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { fadeIn: true };
    this.toggle = this.toggle.bind(this);
}

toggle() {
  this.setState({
      fadeIn: !this.state.fadeIn
  });
}

  render() {
    return (
      <div className='gContainer'> 
        {this.props.movies.map(movie => 
          <div key={movie.id} className='gImg'>
            <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
              <input className='gImage' type='image' onClick={()=>this.props.toggleModal(movie.id)} src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} height='150px' width='100px' alt={movie.name}/>
            </Fade>
          </div>
        )}
      </div>
    )
  }
}
