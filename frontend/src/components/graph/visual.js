import React from 'react';
import * as d3 from 'd3';

class Visual extends React.Component 
{
    create()
    {
        const width = 1000; 
        const height = 560;

        // remove svg if exists, else multiple copies are created
        d3.select("#parent").selectAll("svg").remove(); 

        // creating svg, where the visualisation takes place
        const svg = d3.select("#parent").append("svg").attr("viewBox", [0, 0, width, height]);

        // make an API call and create the network graph
        fetch('http://localhost:4000/api/graphs')
            .then(res => res.json())
            .then(data => 
                {
                    let nodes, links = [];

                    // find the data for the requested graph and fill the nodes and links
                    for(let i = 0; i < data.length; i++)
                    {
                        if(data[i].name === this.props.graph)
                        {
                            nodes = data[i].nodes;
                            for(let j = 0; j < data[i].links.length; j++)
                            {
                                let newObject = {source: data[i].links[j].sourceId, target: data[i].links[j].targetId};
                                links.push(newObject);
                            }           
                            break;
                        }
                    }

                    let colorS = d3.scaleOrdinal(d3.schemeCategory10);

                    // provide data and call d3 force layout functions to simulate
                    const simulation = d3.forceSimulation(nodes)
                                        .force('links', d3.forceLink(links).distance(160).id(d => {return d._id}))
                                        .force("charge", d3.forceManyBody())
                                        .force("center", d3.forceCenter(width / 2, height / 2));

                    // add dragging ability                                                
                    const drag = simulation => {
  
                        function dragstarted(d) {
                          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                          d.fx = d.x;
                          d.fy = d.y;
                        }
                        
                        function dragged(d) {
                          d.fx = d3.event.x;
                          d.fy = d3.event.y;
                        }
                        
                        function dragended(d) {
                          if (!d3.event.active) simulation.alphaTarget(0);
                          d.fx = null;
                          d.fy = null;
                        }
                        
                        return d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended);
                      }
  
                      
                      // details for a link
                      const link = svg.append("g")
                                    .attr("stroke", "#888")
                                    .attr("stroke-opacity", 0.6)
                                    .selectAll("line").data(links).join("line");

                      // details for a node                                    
                      const node = svg.append("g")
                                    .selectAll("circle").data(nodes).join("circle")
                                    .attr("r", 40)
                                    .attr("fill", (d, i) => colorS(i))                            
                                    .on("contextmenu", (d, i) => 
                                    {
                                        // on right-click, show node id
                                        d3.event.preventDefault();
                                        d3.select("#root").select("p").remove();
                                        d3.select("#root").append("p").text("selected node's id: "+d._id);
                                    })
                                    .call(drag(simulation));

                       // details for text inside a node             
                      const text = svg.append("g").selectAll("text").data(nodes).join("text");

                      // calculate co-ordinates for nodes and links during the runtime of simulation
                       simulation.on("tick", () => 
                       {
                           link.attr("x1", d => d.source.x)
                                .attr("y1", d => d.source.y)
                                .attr("x2", d => d.target.x)
                                .attr("y2", d => d.target.y);

                           node.attr("cx", d => d.x)
                                .attr("cy", d => d.y);

                           text.attr("x", d => d.x)
                                .attr("y", d => d.y)
                                .text(d => d.thought)
                                .attr("font-size", "15px")
                                .attr("font-weight", "bold")
                                .attr('text-anchor', 'middle')
                                .attr('alignment-baseline', 'middle')
                       });
                      
                });
    }

    componentDidUpdate()
    {
        if(this.props.graph !== '') this.create();
    }

    render()
    {
        return(
            <div>
            </div>
        );
    }
};

export default Visual;