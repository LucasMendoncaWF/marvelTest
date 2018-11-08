import React, { Component } from 'react';
import '../styles/characters-list.css';
import Character from './character';

class CharactersList extends Component {
   
  render() {
    return (
      <div className='charactes-list-container'>
       {
         //Exibe os personagens na tela, caso pertençam na página selecionada
         Object.keys(this.props.characters).map(key => {
           if(this.props.characters[key].page === parseInt(this.props.page)){
            return <Character key={key} characterInfo={this.props.characters[key]} page={this.page} />
           }else{
             return null
           }
        })}
      </div>
    );
  }
}

export default CharactersList;
