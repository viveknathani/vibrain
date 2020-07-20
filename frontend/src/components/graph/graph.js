import React from 'react';
import List from './list';
import Node from './nodes';
import Links from './links';

class GraphsList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { namesList: [
            {key: '1', name: 'v'},
            {key: '2', name: 'b'},
            {key: '3', name: 'c'}
        ], selected: '' };
        this.remove = this.remove.bind(this);
        this.show = this.show.bind(this);
    }

    remove(key)
    {
        let arr = [];
        for(let i = 0; i < this.state.namesList.length; i++)
        {
            if(this.state.namesList[i].key !== String(key))
            {
                arr.push(this.state.namesList[i]);
            }
        }
        this.setState({namesList: arr, selected: ''});
    }

    show(name)
    {
        this.setState({selected: name});
    }

    render()
    {
        return(
            <div id="box_graph_name">
                <h3>your graphs</h3>
                <form id="form_graph_name">
                    <input placeholder="graph name" id="input_graph_name" ref={(i) => this._inputElement = i}></input>
                    <button type="submit">Add</button>
                </form>
                <List list={this.state.namesList} remove={this.remove} show={this.show}/>
                <Node graph={this.state.selected}/>
                <Links graph={this.state.selected}/>
            </div>
        );
    }
};

export default GraphsList;
