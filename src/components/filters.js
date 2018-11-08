import React, { Component } from 'react';
import '../styles/filters.css';
import FilterAZ from '../images/filter.svg';
import ArrowDown from '../images/arrow-down.png';
import ArrowUp from '../images/arrow-up.png';

class Filters extends Component {

 state={
     order: true,
     filterInput: ''
 }
 //Altera a ordem de A-Z ou Z-A
 changeOrder = () => {
     let order = !this.state.order;
     this.props.changeOrder(order);
     this.setState({order: order});
     this.props.changePage(1);
 }
 // filtra o nome do personagem pelo valor do input
 changeFilter = (e) =>{
    let filter = e.target.value;
    this.setState({filterInput: filter});
    this.props.changePage(1);
    this.props.changeFilter(filter);
 }

  render() {
    return (
      <div className='filters-container'>
        <input className='character-input' onChange={this.changeFilter} type='text' placeholder='Characters' value={this.state.filterInput}/>
        <div className='filter-az' onClick={this.changeOrder}>
            <img className='filter-az-image' alt='filter' src={FilterAZ}/>
            <div className='filter-az-text'>{(() =>{if(this.state.order){return 'A-Z'}else{return 'Z-A'}})()}</div>
            <div className='filter-az-arrow-area'>
                {(() =>{
                    if(this.state.order){ return<img className='filter-az-arrow' alt='filter' src={ArrowDown}/>
                    }else{return<img className='filter-az-arrow' alt='filter' src={ArrowUp}/>}
                })()}
            </div>
        </div>
      </div>
    );
  }
}

export default Filters;
