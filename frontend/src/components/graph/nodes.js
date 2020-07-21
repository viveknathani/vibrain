import React from 'react';

class RegularList extends React.Component
{
    remove(data)
    {
        this.props.remove(data);
    }

    render()
    {
        return(
            <ul className="panel_list_node">
                {
                    this.props.list.map(data => 
                    {
                        return(
                            <li key={data._id}>
                                {data.thought}
                                <button onClick={()=>{this.remove(data)}}>
                                <i class="fa fa-trash-o"></i>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
};

class Node extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={ nodesList: [] };
        this.addNode = this.addNode.bind(this);
        this.remove = this.remove.bind(this);
    }

    fetchData()
    {
        if(this.props.graph !== '')
        {
            fetch('http://localhost:4000/api/graphs')
                .then(res => res.json())
                .then(data => {
                    let arr = [];
                    for(let i = 0; i < data.length; i++)
                    {
                        if(data[i].name === this.props.graph)
                        {
                            for(let j = 0; j < data[i].nodes.length; j++)
                            {
                                let newObject = { _id: data[i].nodes[j]._id, thought: data[i].nodes[j].thought };
                                arr.push(newObject);
                            }
                        }
                    }
                    this.setState({nodesList: arr});
                });   
        }
    }

    componentDidUpdate()
    {
        this.fetchData();
    }

    addNode(e)
    {
        if(this._inputElement.value !== '')
        {
            let graph = String(this.props.graph);
            let str = this._inputElement.value;
            let myObject = {thought: str};
            let final = JSON.stringify(myObject);
            fetch('http://localhost:4000/api/node/'+graph, {method: 'post',    headers: {'Content-Type': 'application/json'},  
            body: final}).then(this.fetchData());
        }
        e.preventDefault();
        this._inputElement.value = '';
    }

    remove(data)
    {
        let arr = [];
        let graph = this.props.graph;
        for(let i = 0; i < this.state.nodesList.length; i++)
        {
            if(this.state.nodesList[i]._id !== data._id)
            {
                arr.push(this.state.nodesList[i]);
            }
        }
        let myObject = {_id: data._id};
        let final = JSON.stringify(myObject);
        this.setState({nodesList: arr}, async() => {
            await fetch('http://localhost:4000/api/node/'+graph, {method: 'delete', headers: {'Content-Type': 'application/json'}, body: final});
        });
    }

    render()
    {
        if(this.props.graph === '')
        {
            return(
                <div id="box_node_name">
                    <h3 className="box_title">nodes</h3>
                </div>
            );
        }
        else 
        {
            return(
                <div id="box_node_name">

                    <h3 className="box_title">nodes of {this.props.graph}</h3>

                        <RegularList list={this.state.nodesList} remove={this.remove}/>

                        <form id="form_node_name" onSubmit={this.addNode}>

                        <input placeholder="thought" id="input_thought" ref={(i) => this._inputElement = i}></input>

                        <button type="submit" className="add">+</button>

                    </form>

                </div>
            );
        }
    }
};

export default Node;