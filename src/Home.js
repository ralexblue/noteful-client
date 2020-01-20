import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {
    render(){
      return (
  
        <>
        <header>
          <Link to='/'>
            <h1>Noteful</h1>
            </Link>
        </header>
        
        </>
        
      );
    }
  }