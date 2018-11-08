import React, { Component } from 'react';
import '../styles/characters-list.css';
import Character from './character';

class CharactersList extends Component {
   
  render() {
    return (
      <div className='charactes-list-container'>
       {
         //Exibe os personagens na tela, caso pertençam na página selecionada
         Object.keys(this.props.characters).map(char => {
           if(this.props.characters[char].page === parseInt(this.props.page)){
            return <Character key={char} characterInfo={this.props.characters[char]} page={this.page} />
           }else{
             return null
           }
        })}
      </div>
    );
  }
}

export default CharactersList;
