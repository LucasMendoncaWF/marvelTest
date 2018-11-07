import React, { Component } from 'react';
import '../styles/page-selector.css';
import ArrowLeft from '../images/arrow-left.svg';
import ArrowRigth from '../images/arrow-right.svg';

class PageSelector extends Component {

changeInputPage = (e) =>{
    this.props.changePage(e.target.value);
}

addPage = () =>{
    if(this.props.pageSelected < this.props.maxPageNumber){
        this.props.changePage(this.props.pageSelected + 1);
    }
}

removePage = () =>{
    if(this.props.pageSelected > 1){
        this.props.changePage(this.props.pageSelected - 1);
    }
}

  render() {
    return (
      <div className='page-selector-container'>
        <div className='arrow-left-area' onClick={this.removePage}>
            <img className='arrow-left' src={ArrowLeft} alt='left' />
        </div> 
            <input type="number" className='page-selected-input' onChange={this.changeInputPage} value={this.props.pageSelected} min='1' max={this.props.maxPageNumber}/>
            <span className='of-pages'> of </span>
            <span className='number-of-pages'>{this.props.maxPageNumber}</span>
        <div className='arrow-rigth-area' onClick={this.addPage}>
            <img className='arrow-right' src={ArrowRigth} alt='right' />
        </div>      
      </div>
    );
  }
}

export default PageSelector;