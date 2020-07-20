import React from 'react';

class Links extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {linksList: []};
    }

    render()
    {
        if(this.props.graph === '')
        {
            return(
                <h3>Select a graph to see the links.</h3>
            );
        }
        else 
        {
            return(
                <div>
                    <h3>Nodes of {this.props.graph}</h3>
                    <form id="form_link">
                        <input placeholder="source" id="input_link_source" ref={(i) => this._inputElementS = i}></input>
                        <input placeholder="target" id="input_link_target" ref={(i) => this._inputElementT = i}></input>
                        <button type="submit">Add</button>
                    </form>
                </div>
            );
        }
    }
};

export default Links;