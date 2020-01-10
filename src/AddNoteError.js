import React from 'react';


export default class AddNoteError extends React.Component {
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
                <h2>The note was not successfully added. An error has occured.</h2>
            )
        }
        return this.props.children;
    }
  }