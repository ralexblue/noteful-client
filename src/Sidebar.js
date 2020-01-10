import React from 'react';
import {Link} from 'react-router-dom';
import AddFolder from './AddFolder';
import AddFolderError from './AddFolderError';
import FoldersContext from './context/FoldersContext';

export default class Sidebar extends React.Component {

  static contextType = FoldersContext;

  state = {
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

  renderAddFolder = () => {
    if (this.state.formOpen) {
      return (
        <AddFolderError>
          <AddFolder/>
          <button onClick={(e) => this.handleClickClose(e)}>Close</button>
        </AddFolderError>
      )
    } 
    return <></>
  }

  render(){
    const folders = this.context.folders.map((folder)=>
      <Link className="folder box" id={folder.id} to={`/folder/${folder.id}`}>
        <h2>{folder.name}</h2>
      </Link>
    );
    return (
      <div>
        {folders}
        <button onClick={(e) => this.handleClick(e)} handletype="button">Add folder</button>
        {this.renderAddFolder()}
      </div>
    );
  }
}