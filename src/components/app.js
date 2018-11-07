import React, { Component } from 'react';
import '../styles/fonts.css';
import '../styles/app.css';
import MarvelCharactersLoader from "../requestAPI";
import Header from './header';
import Footer from './footer';
import CharactersArea from './characters-area';

class App extends Component {

state = {
    marvelCharacters: {},
    maxPage: 0
};

compareAZ = (a,b) => {
  var aName = (a.name.split('(')[0] || a.name).trim().toUpperCase();
  var bName = (b.name.split('(')[0] || b.name).trim().toUpperCase();
  return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
}

compareZA = (a,b) => {
  var aName = (a.name.split('(')[0] || a.name).trim().toUpperCase();
  var bName = (b.name.split('(')[0] || b.name).trim().toUpperCase();
  return (aName < bName) ? 1 : (aName > bName) ? -1 : 0;
}

getCharacters = (order, filter) =>{ 
    var marvelCharacters = new MarvelCharactersLoader();
    marvelCharacters.getAllMarvelCharacters((characters) =>{
      var charactersSorted = [];
      if(order){
      charactersSorted = characters.sort(this.compareAZ);
      }else{
        charactersSorted = characters.sort(this.compareZA);
      }
      var actualPage = 1;
      this.setState({maxPage: actualPage});
      var characterNumber = 1;
        this.setState({
          marvelCharacters: charactersSorted.reduce((marvelChars, character) => {
            var filterNew = filter.toUpperCase();
            var charName = character.name.toUpperCase();
            if(charName.indexOf(filterNew) !== -1){
              character['page'] = actualPage;
              marvelChars[character.id] = character;          
              characterNumber++;
              if(characterNumber > 12){
                actualPage++;
                console.log(actualPage);
                this.setState({maxPage: actualPage});
                characterNumber = 1;
              }      
            }
            return marvelChars;
          }, {})
      });
    });   
}

  componentDidMount() {
    this.getCharacters(true, '');
  }

  render() {
    return (
      <div className="marvel-app">
       <Header />
        <div className='character-list-area'>
          <CharactersArea getCharacters={this.getCharacters} maxPage={this.state.maxPage} characters={this.state.marvelCharacters}/>
        </div>
       <Footer />
      </div>
    );
  }
}

export default App;
