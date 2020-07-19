import React from 'react';
import './list.css';

/* 
    Display is an internal component used by the GraphList component.
    It is used to display the list of names of graphs.
*/
class Display extends React.Component
{
    show(graphName) 
    {
        return (
            <li key={graphName.key}>{graphName.name}</li>
        );
    }

    render()
    {
        let graphs = this.props.entries;
        let listOfGraphs = graphs.map(this.show);
        return(
            <ul>
                {listOfGraphs}
            </ul>
        );
    }
};

class GraphList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { graphsList: [] }
        this.addToList = this.addToList.bind(this);
    }

    // This function makes an API call and gets all the graph names.
    fetchData()
    {
        fetch('http://localhost:4000/api/graphs')
                .then(res => res.json())
                .then(data => {
                    let arr = [];
                    for(let i = 0; i < data.length; i++)
                    {
                        let newObject = { key: data[i]._id, name: data[i].name };
                        arr.push(newObject);
                    }

                    this.setState({graphsList: arr});
                });
    }

    doesThisExist(arr, str)
    {
        for(let i = 0; i < arr.length; i++)
            if(arr[i].name === str) return true;
        return false;
    }

    addToList(e)
    {
        if(this._inputElement.value !== '' && !this.doesThisExist(this.state.graphsList, this._inputElement.value))
        {
            let str = String(this._inputElement.value);
            fetch('http://localhost:4000/api/graphs/'+str, {method: 'post'}).then(this.fetchData());
        }
        e.preventDefault();
        this._inputElement.value = '';
    }

    componentDidMount()
    {
        this.fetchData();
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