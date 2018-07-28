import React, { Component } from 'react'

export default class Gallery extends Component {
  render() {
    return (
      <div className='gContainer'>
        {this.props.movies.map(movie => 
          <div key={movie.id} className='gImg'>
            <input className='gImage' type='image' onClick={()=>this.props.toggleModal(movie.id)} src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} height='150px' width='100px' alt={movie.name}/>
          </div>
        )}
      </div>
    )
  }
}
