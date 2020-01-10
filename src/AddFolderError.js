import React from 'react';


export default class AddFolderError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        hasError:false
        }
    }

    static getDerivedStateError(error){
        return {hasError:true};
    }
    render(){ 
        if(this.state.hasError){   
            return (
                <h2>Add Folderhas an Error</h2>
            )
        }
        return this.props.children;
    }
  }