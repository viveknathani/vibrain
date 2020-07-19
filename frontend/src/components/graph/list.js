import React from 'react';
import './list.css';

class Display extends React.Component
{
    show(item) 
    {
        return (
            <li key={item.key}>{item.name}<button class="delete_button"><i class="fa fa-trash"></i></button>
        </li>);
    }

    render()
    {
        let entry = this.props.entries;
        let theList = entry.map(this.show);
        return(
            <ul>
                {theList}
            </ul>
        );
    }
};

class GraphList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            graphsList: []
        }

        this.addToList = this.addToList.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
    }

    addToList(e)
    {
        if(this._inputElement.value !== '')
        {
            let str = {name: this._inputElement.value, key: Date.now()};
            this.setState(
                { graphsList: [...this.state.graphsList, str] },
                () => console.log(this.state.graphsList)
            );
        }
        e.preventDefault();
        this._inputElement.value = '';
    }

    removeFromList()
    {

    }

    render()
    {
        return(
            <div id="box">
                <h3 id="graph_list_title">your graphs</h3>
                <Display entries={this.state.graphsList}/>
                <form onSubmit={this.addToList} id="graph_form">
                    <input ref={(i) => this._inputElement = i} placeholder="graph name" id="graph_input"></input>
                    <button type="submit" id="add">+</button>
                </form>
            </div>
        );
    }
};

export default GraphList;