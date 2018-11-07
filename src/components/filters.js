import React, { Component } from 'react';
import '../styles/filters.css';
import FilterAZ from '../images/filter.svg';
import Arrow from '../images/arrow-down.svg';

class Filters extends Component {

 state={
     order: true,
     filterInput: ''
 }

 changeOrder = () => {
     var order = !this.state.order;
     this.props.getCharacters(order, this.state.filterInput);
     this.setState({order: order});
     this.props.changePage(1);
 }

 changeFilter =(e) =>{
    var filter = e.target.value;
    this.setState({filterInput: filter});
    this.props.changePage(1);
    this.props.getCharacters(this.state.order, filter);
 }

  render() {
    return (
      <div className='filters-container'>
        <input className='character-select' onChange={this.changeFilter} type='text' placeholder='Characters' value={this.state.filterInput}/>
        <div className='filter-az' onClick={this.changeOrder}>
            <img className='filter-az-image' alt='filter' src={FilterAZ}/>
            <div className='filter-az-text'>A-Z</div>
            <div className='filter-az-arrow-area'>
                <img className='filter-az-arrow' alt='filter' src={Arrow}/>
            </div>
        </div>
      </div>
    );
  }
}

export default Filters;
