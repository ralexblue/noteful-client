import React from 'react';
import FoldersContext from './context/FoldersContext';
import ValidationError from './ValidationError'


export default class AddNote extends React.Component { 
    static contextType = FoldersContext;

    constructor(props) {
        super(props);
        this.state = {
            note: {
                author: "",
                touched: false
            },
            folder:null,
        }
    }

    
    validateName() {
        const author = this.context.note.author;
        if (author === "") {
            return "author is required";
        }
        else {
            return null;
        }
    }
    

    render(){   
        const folders = this.context.folders.map((folder)=>
      <option className="folder box" id={folder.id} value={folder.id}>
        {folder.title}
      </option>
    ); 
      return (
         <> 
        <form onSubmit={(e)=>this.context.handleSubmitNote(e,new Date().toLocaleString())}>
            <label htmlFor="NoteName">Note Name: </label>
            <input type="text" 
            name="name" onChange={e => this.context.handleChangeNoteName(e.currentTarget.value)} required/>
            {<ValidationError message={this.validateName()}/>}   
            <br />
            <label htmlFor="NoteDesc">Note Description: </label>
            <input type="textarea" name="description" onChange={e => this.context.handleChangeNoteDesc(e.currentTarget.value)}/>
            <label>Folder:</label>
            <select name="folders"onChange={e => this.context.handleChangeNotefolder(e.currentTarget.value)} required>
            {folders}
            </select>
            <button type="submit">submit</button>
        </form>
        </>
      )
    }
}

 



