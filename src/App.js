import React from 'react';
import Home from './Home';
import Sidebar from './Sidebar';
import Notes from './Notes';
import Note from './note';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import FoldersContext from './context/FoldersContext';
import AppError from './AppError'
import PropTypes from 'prop-types';
import config from './config';


FoldersContext.Provider.propTypes={
  notes:PropTypes.array,
  folders:PropTypes.array,
  foldername:PropTypes.string.isRequired,
  note:{
    name:PropTypes.string.isRequired,
    content:PropTypes.string.isRequired,
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      folders: [],
      notes: [],
      foldername: "",
      note: {
        author: "",
        content: "",
        folder:""
        },
      error: null
    }
  }

  getfolder=() => {
    fetch(`${config.API_ENDPOINT}/folders`, {
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
    fetch(`${config.API_ENDPOINT}/notes`, {
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
    return fetch(`${config.API_ENDPOINT}/notes/${id}`, {
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
          title:name
      }
  })
}

handleSubmitFolderName=(e)=>{
    const thename=JSON.stringify(this.state.foldername);
    
    e.preventDefault();
    
    fetch(`${config.API_ENDPOINT}/folders`, {
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
      author: e
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
handleChangeNotefolder= (e) => {
  this.setState({
      note: {
      ...this.state.note,
      folder: e
      }
  })
}

handleSubmitNote = (e) => {
    e.preventDefault();
    const newNoteAdd={
      ...this.state.note,
    }
    
    const theNote = JSON.stringify(newNoteAdd);
  console.log(theNote);
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/notes`, {
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
        <AppError>
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
                      handleSubmitNote:this.handleSubmitNote,
                      handleChangeNotefolder:this.handleChangeNotefolder
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

/*App.PropTypes={
  note:{
      name:PropTypes.string,
      content:PropTypes.string,
  },
  folderId:PropTypes.string,
}*/