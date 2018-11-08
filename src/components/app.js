import React, { Component } from 'react';
import '../styles/fonts.css';
import '../styles/app.css';
import MarvelCharactersLoader from "../requestAPI";
import Header from './header';
import Footer from './footer';
import CharactersArea from './characters-area';

class App extends Component {

order= true
filter = '';

state = {
    marvelCharactersNew: {},
    characters: {},
    maxPage: 0
};

//Ordenação
compare = (a,b) => {
  let aName = a.name.toUpperCase();
  let bName = b.name.toUpperCase();
  if(this.order){
    return (aName < bName) ? -1 : (aName > bName) ? 1 : 0; 
  }else{
    return (aName < bName) ? 1 : (aName > bName) ? -1 : 0;
  }  
}

//Alteração da ordem de A-Z ou Z-A
changeOrder = (order) =>{
  this.order = order;
  this.getCharacters();
}

//Filtra de acordo com o input de filtro
changeFilter = (filter) =>{
  this.filter = filter;
  this.getCharacters();
}

getCharacters = () =>{ 
      //Ordenação
      let charactersSorted = [];
      charactersSorted = this.state.characters.sort(this.compare);

      //variaveis de paginação
      let actualPage = 1;
      this.setState({maxPage: actualPage});
      let characterNumber = 1;
      
      //Atribuição dos personagens para o state
      let charactersOrdered = [];  
      const filterNew = this.filter.toUpperCase();
      for(let char of charactersSorted){
        const charName = char.name.toUpperCase();
        //filtro de acordo com o nome do personagem e o valor inserido no input
        if(charName.indexOf(filterNew) !== -1){ 
          //definição da página do personagem atual 
          char['page'] = actualPage;       
          charactersOrdered.push(char); 
          
          //Alteração de página a cada 12 personagens    
          characterNumber++;
          if(characterNumber > 12){
            actualPage++;
            this.setState({maxPage: actualPage});
            characterNumber = 1;
          }      
        }
      }
      //personagens para state
        this.setState({
          marvelCharactersNew: charactersOrdered
      }); 
}

  componentDidMount() {
    //Alimenta state charactes com os personagens da requisição
    let marvelCharacters = new MarvelCharactersLoader();
    marvelCharacters.getAllMarvelCharacters((characters) =>{
      this.setState({characters: characters});
      this.getCharacters('');
    });
  }

  render() {
    return (
      <div className="marvel-app">
       <Header />
        <div className='character-list-area'>
          <CharactersArea getCharacters={this.getCharacters} changeFilter={this.changeFilter} changeOrder={this.changeOrder} maxPage={this.state.maxPage} characters={this.state.marvelCharactersNew}/>
        </div>
       <Footer />
      </div>
    );
  }
}

export default App;
