import React from 'react';
import FoldersContext from './context/FoldersContext';
import ValidationError from './ValidationError'

export default class AddNote extends React.Component { 
    static contextType = FoldersContext;

    constructor(props) {
        super(props);
        this.state = {
            note: {
                name: "",
                touched: false
            }
        }
    }

    
    validateName() {
        const name = this.context.note.name;
        if (name === "") {
            return "Name is required";
        }
        else {
            return null;
        }
    }
    
    render(){    
      return (
         <> 
        <form onSubmit={(e)=>this.context.handleSubmitNote(e,this.props.match.params.folderid,new Date().toLocaleString())}>
        <label htmlFor="NoteName">Note Name: </label>
        <input type="text" 
           name="name" onChange={e => this.context.handleChangeNoteName(e.currentTarget.value)}/>
        {<ValidationError message={this.validateName()}/>}   
        <br />
        <label htmlFor="NoteDesc">Note Description: </label>
        <input type="textarea" name="description" onChange={e => this.context.handleChangeNoteDesc(e.currentTarget.value)}/>
        <button type="submit">submit</button>
        </form>
        </>
      )
    }
  }

