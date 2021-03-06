import React from 'react';
import List from './list';
import Node from './nodes';
import Links from './links';
import Visual from './visual';
import './style.css';

class GraphsList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { namesList: [], selected: localStorage.getItem('selected') || []};
        this.remove = this.remove.bind(this);
        this.show = this.show.bind(this);
        this.addToList = this.addToList.bind(this);
    }

    remove(name)
    {
        let arr = [];
        for(let i = 0; i < this.state.namesList.length; i++)
        {
            if(this.state.namesList[i].name !== String(name))
            {
                arr.push(this.state.namesList[i]);
            }
        }
        this.setState({namesList: arr}, async() => {
            await fetch('http://localhost:4000/api/graphs/'+name, {method: 'delete'});
        });
    }

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

                    this.setState({namesList: arr});
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
        if(this._inputElement.value !== '' && !this.doesThisExist(this.state.namesList, this._inputElement.value))
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

    show(name)
    {
        this.setState({selected: name}, ()=>{
            localStorage.setItem('selected', this.state.selected);
        });
    }

    render()
    {
        return(
            <div id="parent">

                <div id="box_graph_name">

                    <h3 className="box_title">your graphs</h3>

                    <List list={this.state.namesList} remove={this.remove} show={this.show}/>

                    <form id="form_graph_name" onSubmit={this.addToList}>

                        <input placeholder="graph name" id="input_graph_name" ref={(i) => this._inputElement = i}></input>

                        <button type="submit" className="add">+</button>

                    </form>

                </div>        

                <Node graph={this.state.selected}/>

                <Links graph={this.state.selected}/>

                <Visual graph={this.state.selected}/>

            </div>
        );
        
    }
};

export default GraphsList;
