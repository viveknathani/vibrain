import React from 'react';
import './header.css';

class Header extends React.Component
{
    render()
    {
        return(
            <div id="top">
                <div id="content"> 
                    <ul>
                        <li id="head" className="LI">vibrain</li>
                        <li id="about" className="LI">about</li>
                    </ul>
                </div>
                <hr id="line"/>
            </div>
        );
    }  
};

export default Header;