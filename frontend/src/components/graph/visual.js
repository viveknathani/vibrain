import React from 'react';
import * as d3 from 'd3';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

class Visual extends React.Component 
{
    create()
    {
        d3.select("#parent").selectAll("svg").remove();
        console.log(this.props.graph);
        const width = 1000;
        const height = 560;
        const svg = d3.select("#parent").append("svg").attr("viewBox", [0, 0, width, height]);
        fetch('http://localhost:4000/api/graphs')
            .then(res => res.json())
            .then(data => 
                {
                    let nodes, links = [];
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

                    for(let i = 0; i < nodes.length; i++)
                    {
                        nodes[i].group = getRndInteger(1, 5);
                    }

                    let colors = ['#FF7B00', '#E8FF00', '#59FF00', '#004DFF'];

                    console.log(nodes);



                    const simulation = d3.forceSimulation(nodes).force('links', d3.forceLink(links).distance(160).id(d => {return d._id})).force("charge", d3.forceManyBody()).force("center", d3.forceCenter(width / 2, height / 2));
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
                
                      const link = svg.append("g").attr("stroke", "#888").attr("stroke-opacity", 0.6).selectAll("line").data(links).join("line");
                      const node = svg.append("g").selectAll("circle").data(nodes).join("circle").attr("r", 40).attr("fill", () => { let i = getRndInteger(0, 4); return colors[i];})
                      .on("contextmenu", function (d, i) {
                        d3.event.preventDefault();
                        d3.select("#root").select("p").remove();
                       d3.select("#root").append("p").text("selected node's id: "+d._id);
                    }).call(drag(simulation));
                       const text = svg.append("g").selectAll("text").data(nodes).join("text").attr("color", "blue");
                       simulation.on("tick", () => {
                           link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
                           node.attr("cx", d => d.x).attr("cy", d => d.y);
                           text.attr("x", d => d.x).attr("y", d => d.y).text(d => d.thought).attr("font-size", "15px").attr("font-weight", "bold").attr('text-anchor', 'middle')
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
            <div id="#node_info">
            </div>
        );
    }
};

export default Visual;