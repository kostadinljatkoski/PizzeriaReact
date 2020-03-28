import React from "react";
import image from '../../../images/pizza.jpeg';

const pizza = props => {

    const myImgStyle = {
      width : "30px",
      height : "30px"
    };

    return (
        <li className="media mt-4">
            <img src={image} className="mr-3" alt="..." style={myImgStyle}/>
                <div className="media-body">
                    <h6 className="mt-0 mb-1">{props.pizza.name}</h6>
                    {props.pizza.description}
                </div>
        </li>
    )

};


export default pizza;