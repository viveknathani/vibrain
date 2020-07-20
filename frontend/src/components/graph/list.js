import React from 'react';

class List extends React.Component
{
    remove(name)
    {
        this.props.remove(name);
    }

    show(name)
    {
        this.props.show(name);
    }

    render()
    {
        return(
            <ul>
                {
                    this.props.list.map(data => 
                    {
                        return(
                            <li key={data.key}>{data.name}<button onClick={()=>{this.remove(data.name)}}>Delete</button><button onClick={()=>{this.show(data.name)}}>Show</button></li>
                        )
                    })
                }
            </ul>
        );
    }
};

export default List;