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
            <ul>
                {
                    this.props.list.map(data => 
                    {
                        return(
                            <li key={data.sourceId+data.targetId}>{data.sourceId+"/"+data.targetId}<button onClick={()=>{this.remove(data)}}>Delete</button></li>
                        )
                    })
                }
            </ul>
        );
    }
};

class Links extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {linksList: []};
        this.remove = this.remove.bind(this);
        this.addLink = this.addLink.bind(this);

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
                            for(let j = 0; j < data[i].links.length; j++)
                            {
                                let newObject = { sourceId: data[i].links[j].sourceId, targetId: data[i].links[j].targetId };
                                arr.push(newObject);
                            }
                        }
                    }
                    this.setState({linksList: arr});
                }); 
        }          
    }

    addLink(e)
    {
        if(this.one.value !== '' && this.two.value !== '')
        {
            let graph = String(this.props.graph);
            let ID1 = this.one.value;
            let ID2 = this.two.value;
            console.log(ID1, ID2);
            let myObject = {_id1: ID1, _id2: ID2};
            let final = JSON.stringify(myObject);
            fetch('http://localhost:4000/api/link/'+graph, {method: 'post', headers: {'Content-Type': 'application/json'},  
            body: final}).then(this.fetchData());
        }
        e.preventDefault();
    }

    remove(data)
    {
        let arr = [];
        let graph = this.props.graph;
        for(let i = 0; i < this.state.linksList.length; i++)
        {
            if(this.state.linksList[i]._id !== data._id)
            {
                arr.push(this.state.linksList[i]);
            }
        }
        let myObject = {_id1: data.sourceId, _id2: data.targetId};
        let final = JSON.stringify(myObject);
        this.setState({nodesList: arr}, async() => {
            await fetch('http://localhost:4000/api/link/'+graph, {method: 'delete', headers: {'Content-Type': 'application/json'}, body: final});
        });
    }

    componentDidUpdate()
    {
        this.fetchData();
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
                    <h3>Links of {this.props.graph}</h3>
                    <form id="form_link" onSubmit={this.addLink}>
                        <input placeholder="source" id="input_link_source" ref={(i) => this.one = i}></input>
                        <input placeholder="target" id="input_link_target" ref={(j) => this.two = j}></input>
                        <button type="submit">Add</button>
                    </form>
                    <RegularList list={this.state.linksList} remove={this.remove}/>
                </div>
            );
        }
    }
};

export default Links;