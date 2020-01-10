import React from 'react';
import FoldersContext from './context/FoldersContext';

export default class AddNote extends React.Component { 
    
    static contextType = FoldersContext;

    constructor(props) {
        super(props)
        this.state={
            note: {
            noteName: "",
            noteDesc: ""
            }
        }
    } 

    handleChangeNoteName = (e) => {
        this.setState({
            note: {
            ...this.state.note,
            noteName: e
            }
        })
    }
    handleChangeNoteDesc = (e) => {
        this.setState({
            note: {
            ...this.state.note,
            noteDesc: e
            }
        })
    }

    handleSubmitNote = (e) => {
        const theNote = JSON.stringify(this.state.note);
        e.preventDefault();
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:theNote
        })
        .catch((error) => {
            console.log(error.message);
      });
    }
    render(){    
      return (
        <form onSubmit={(e)=>this.handleSubmitNote(e)}>
        <label htmlFor="NoteName">Note Name: </label>
        <input type="text" 
           name="name" onChange={e => this.handleChangeNoteName(e.currentTarget.value)}/>
        <br />
        <label htmlFor="NoteDesc">Note Description: </label>
        <input type="textarea" name="description" onChange={e => this.handleChangeNoteDesc(e.currentTarget.value)}/>
        <button type="submit">submit</button>
        </form>
      )
    }
  }