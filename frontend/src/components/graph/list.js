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
            <ul className="panel_list_graph">
                {
                    this.props.list.map(data => 
                    {
                        return(
                            <li key={data.key}>
                                {data.name}
                                <button onClick={()=>{this.show(data.name)}}>
                                    <i class="fa fa-eye"></i>
                                </button>
                                <button onClick={()=>{this.remove(data.name)}}>
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

export default List;