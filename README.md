# Vibrain

Vibrain is a full-stack web application that lets you visualise networks graphs. You can create as many graphs as you want. Each graph can have any number of nodes, optionally connected by links. This web application uses the **MERN**, combined with the library **D3.js**.

## The need

It is not necessary that every kind of note you take has a linear flow. Sometimes, your notes, thoughts, ideas can have a non-linear flow. In these cases, a network graph can help. Even if you want to stick to linearity, you can just do sequential insertion and linking of nodes in this.

## The concept

Graph are an amazing area of study in discrete mathematics and computer science. There is enough content on the Internet that explains the best practices to store a graph in memory. Visualising them is a still a lesser known thing. 

Force-directed graph drawing algorithms are a class of algorithms for drawing graphs in an aesthetically-pleasing way. Their purpose is to position the nodes of a graph in two-dimensional or three-dimensional space so that all the edges are of more or less equal length and there are as few crossing edges as possible, by assigning forces among the set of edges and the set of nodes, based on their relative positions, and then using these forces either to simulate the motion of the edges and nodes or to minimize their energy.

## The tech stack

**MongoDB**: CRUD data <br/>
**Express**: Provides a robust way of handling requests for the backend's API. <br/>
**React**: An amazing library for creating user interfaces using components. <br/>
**Node.js**: Enables the usage of JavaScript in both backend and frontend. <br/>

## Build 
Clone this repository. <br/>
Start mongodb server. <br/>
`$ mongo`<br/>
Go to root directory of this project. <br/>
`$ cd backend` <br/>
Install dependencies. <br/>
`$ npm install` <br/>
Start the backend server. <br/>
`$ node index.js` <br/>
Go back to root directory of this project. <br/>
`$ cd frontend` <br/>
Install dependencies. <br/>
`$ npm install` <br/>
Start the front server. <br/>
`$ npm start` <br/>
And play!

## LICENSE
[MIT](https://github.com/viveknathani/vibrain/blob/master/LICENSE)
