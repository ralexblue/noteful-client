import React from 'react';
import Home from './Home';
import Sidebar from './Sidebar';
import Notes from './Notes';
import Note from './note';
import './App.css';
//import dummy from './dummy-store';
import {Route, Switch} from 'react-router-dom';
import FoldersContext from './context/FoldersContext';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      folders :[],
      notes:[],
      foldername:"",
      noteName: ""
    }
  }

  componentDidMount(){
    fetch(`http://localhost:9090/folders`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
    })
    .then(res=>res.json())
    .then(data=>{
    this.setState({
      folders:data,
    })
    
    })
    fetch(`http://localhost:9090/notes`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
    })
    .then(res=>res.json())
    .then(data=>{
    this.setState({
      notes:data,
    })
    })
  }


  deletehandlenote =(id) =>{
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
      console.error(error)
    })
  }

handleChangeFolderName=(name)=>{
  console.log(name);
  this.setState({
      foldername:{
          name
      }
  })
}

handleSubmitFolderName=(e)=>{
    const thename=JSON.stringify(this.state.foldername);
    e.preventDefault();
    console.log(thename)
    fetch(`http://localhost:9090/folders`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json'
    },
    body:thename
    })
    .catch((error) => {
        console.log(error.message);
  });
}
  render(){
    return (
      <>
        <main>
          <Route path='/' component={Home} /> 
        </main>
        <div className="holder">
        <FoldersContext.Provider value={{
                folders: this.state.folders,
                notes: this.state.notes,
                deletehandlenote:this.deletehandlenote,
                handleChangeFolderName:this.handleChangeFolderName,
                handleSubmitFolderName:this.handleSubmitFolderName,
            }}>
          <Sidebar />
          <Switch>
            <Route 
            path='/folder/:folderid'
            render={props => <Notes {...props} />}
            />
            <Route 
            path='/note/:noteid'
            render={(props,history) => <Note {...props}  />}
            />
          </Switch>
        </FoldersContext.Provider>
        </div>
      </>
    );
  }
}