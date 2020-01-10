import React from 'react';
import FoldersContext from './context/FoldersContext';

export default class AddFolder extends React.Component {   
    static contextType = FoldersContext;
    render(){    
      return (
        <form onSubmit={(e)=>this.context.handleSubmitFolderName(e)}>
        <input type="text" 
           name="name" onChange={e => this.context.handleChangeFolderName(e.currentTarget.value)}/>
        <button type="submit">submit</button>
        </form>
      )
    }
  }