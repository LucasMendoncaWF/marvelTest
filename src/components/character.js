import React, { Component } from 'react';
import '../styles/character.css';

class Character extends Component {

  render() {
    return (
      <div className='character-container'>
        <img className='character-image' alt='character' src={this.props.characterInfo.thumbnail.path + '.' + this.props.characterInfo.thumbnail.extension} />
        <div className='character-name'>
          {//remoção do titulo entre () do nome
            this.props.characterInfo.name.split('(')[0] || this.props.characterInfo.name
          }
        </div>
        <div className='character-title'>
        {(() =>{
          //Remoção dos () do titulo do personagem
          if(this.props.characterInfo.name.split('(')[1]){
              return this.props.characterInfo.name.split('(')[1].split(')')[0]
          }else{
              return '';
          }
        })()}</div>
        <div className='character-line'></div>
        <div className='character-description' title={this.props.characterInfo.description}>{this.props.characterInfo.description}</div>
      </div>
    );
  }
}

export default Character;
