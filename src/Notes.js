import React from 'react';
import './Notes.css';
import {Link} from 'react-router-dom';
import AddNote from './AddNote';
import FoldersContext from './context/FoldersContext';
import AddNoteError from './AddNoteError'

export default class Notes extends React.Component {

  static contextType = FoldersContext;

  state= {
    formOpen: false
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      formOpen: true
    })
  }

  handleClickClose = (e) => {
    e.preventDefault()
    this.setState({
      formOpen: false
    })
  }

  renderAddNote = () => {
    if (this.state.formOpen) {
      return (
        <AddNoteError>
            <AddNote {...this.props}/>
            <button onClick={(e) => this.handleClickClose(e)}>Close</button>
        </AddNoteError>
      )
    } 
    return <></>
  }
  
    render(){
        const notes = this.context.notes
        .filter(note=>note.folderId===this.props.match.params.folderid)
        .map((note)=>
        <>
        <Link className="folder box" id={note.id} to={`/note/${note.id}`}>
          <h2>{note.name}</h2>
        </Link>
        <button  type="button" onClick={()=>this.context.deletehandlenote(note.id)}>delete</button>
        </>
      );
      return (
        <div className="noteholder">
            {notes}
            <br />
            <button onClick={(e) => this.handleClick(e)}>Add Note</button>
            {this.renderAddNote()}
        </div>
      );
    }
}