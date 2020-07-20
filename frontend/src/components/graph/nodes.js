import React from 'react';

class Node extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={ nodesList: [] };
    }

    render()
    {
        if(this.props.graph === '')
        {
            return(
                <h3>Select a graph to see the nodes.</h3>
            );
        }
        else 
        {
            return(
                <div>
                    <h3>Nodes of {this.props.graph}</h3>
                    <form id="form_node_name">
                        <input placeholder="thought" id="input_thought" ref={(i) => this._inputElement = i}></input>
                        <button type="submit">Add</button>
                    </form>
                </div>
            );
        }
    }
};

export default Node;