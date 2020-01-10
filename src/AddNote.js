import React from 'react';
import FoldersContext from './context/FoldersContext';

export default class AddNote extends React.Component { 
    
    static contextType = FoldersContext;
    render(){    
        //console.log(this.props.match.params);
      return (
        <form onSubmit={(e)=>this.context.handleSubmitNote(e,this.props.match.params.folderid,new Date().toLocaleString())}>
        <label htmlFor="NoteName">Note Name: </label>
        <input type="text" 
           name="name" onChange={e => this.context.handleChangeNoteName(e.currentTarget.value)}/>
        <br />
        <label htmlFor="NoteDesc">Note Description: </label>
        <input type="textarea" name="description" onChange={e => this.context.handleChangeNoteDesc(e.currentTarget.value)}/>
        <button type="submit">submit</button>
        </form>
      )
    }
  }

