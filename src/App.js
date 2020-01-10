import React from 'react';
import Home from './Home';
import Sidebar from './Sidebar';
import Notes from './Notes';
import Note from './note';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import FoldersContext from './context/FoldersContext';
import AppError from './AppError'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      folders :[],
      notes:[],
      foldername:"",
      note: {
        name: "",
        content: "",
        folderId:""
        },
      error: null
    }
  }

  getfolder=() => {
    fetch(`http://localhost:9090/folders`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => { 
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
        this.setState({
          folders:data,
        })
    })
    .catch(error => {
        this.setState({
          error: error.message
        })
    })
  }

  getnotes=() => {
    fetch(`http://localhost:9090/notes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => { 
            throw error
          })
        }
        return res.json()
      })
    .then(data=>{
      this.setState({
        notes:data,
      })
    })
    .catch(error => {
      this.setState({
        error: error.message
      })
  })
}

  componentDidMount() {
    this.getfolder();
    this.getnotes();
  }


  deletehandlenote = (id) =>{
    const newNotes = this.state.notes.filter(notes =>
    notes.id !== id
    )
    this.setState({
      notes: newNotes,
    })
    return fetch(`http://localhost:9090/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => { 
          throw error
        })
      }
      return res.json()
    })
    .catch(error => {
      this.setState({
        error: error.message
      })
  })
}

handleChangeFolderName=(name)=>{
  this.setState({
      foldername:{
          name
      }
  })
}

handleSubmitFolderName=(e)=>{
    const thename=JSON.stringify(this.state.foldername);
    
    e.preventDefault();
    
    fetch(`http://localhost:9090/folders`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json'
    },
    body:thename
    })
    .then(res =>res.json())
    .then(data=>{
      this.setState({
        ...this.state.folders.push(data),
      })
    })
    .catch(error => {
      this.setState({
        error: error.message
      })
  })
}

handleChangeNoteName = (e) => {
  this.setState({
      note: {
      ...this.state.note,
      name: e
      }
  })
}

handleChangeNoteDesc = (e) => {
  this.setState({
      note: {
      ...this.state.note,
      content: e
      }
  })
}

handleSubmitNote = (e, id, date) => {
    e.preventDefault();
    const newNoteAdd={
      ...this.state.note,
      folderId:id,
      modified:date
    }
    
    const theNote = JSON.stringify(newNoteAdd);

    e.preventDefault();
    fetch('http://localhost:9090/notes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:theNote
    })
    .then(res =>res.json())
    .then(data=>{
      this.setState({
        ...this.state.notes.push(data),
      })
    })
    .catch(error => {
      this.setState({
        error: error.message
      })
  })
}

  render(){
    return (
      <>
        <main>
          <Route path='/' component={Home} /> 
        </main>
        <AppError message={this.state.error}>
          <div className="holder">
              <FoldersContext.Provider value={{
                      folders: this.state.folders,
                      notes: this.state.notes,
                      note: this.state.note,
                      deletehandlenote:this.deletehandlenote,
                      handleChangeFolderName:this.handleChangeFolderName,
                      handleSubmitFolderName:this.handleSubmitFolderName,
                      handleChangeNoteName:this.handleChangeNoteName,
                      handleChangeNoteDesc:this.handleChangeNoteDesc,
                      handleSubmitNote:this.handleSubmitNote
                  }}>
                <Sidebar />
                <Switch>
                  <Route 
                  path='/folder/:folderid'
                  render={props => <Notes {...props} />}
                  />
                  <Route 
                  path='/note/:noteid'
                  render={(props) => <Note {...props}  />}
                  />
                </Switch>
              </FoldersContext.Provider>
          </div>
        </AppError>
      </>
    );
  }
}