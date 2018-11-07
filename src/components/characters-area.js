import React, { Component } from 'react';
import '../styles/characters-area.css';
import Filters from './filters';
import CharactersList from './characters-list';
import PageSelector from './page-selector';

class CharactersArea extends Component {

  state = {
      page: 1
  }   

  changePage = (pageNumber) =>{
      this.setState({page: pageNumber});
  }

  render() {
    return (
      <div className='character-area-container'>
        <div className='area-title'>Character</div>
        <Filters getCharacters={this.props.getCharacters}/>
        <CharactersList page={this.state.page} characters={this.props.characters}/>
        <PageSelector changePage={this.changePage} maxPageNumber={this.props.maxPage} pageSelected={this.state.page}/>
      </div>
    );
  }
}

export default CharactersArea;
