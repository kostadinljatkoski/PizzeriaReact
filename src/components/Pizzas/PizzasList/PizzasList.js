import React from "react";
import Pizza from '../Pizza/Pizza';
import 'react-light-accordion/demo/css/index.css';

const pizzasList = props => {
    return (
        <ul className="list-unstyled">
            {showPizzas()}
        </ul>
    );

    function showPizzas() {
        return props.pizzas.map(p => <Pizza pizza={p} key={p.name}/>)
    }
};

export default pizzasList;