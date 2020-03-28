import React from 'react';
import {Link} from "react-router-dom";


const ingredient = props => {

    const myButtonStyle = {
        width : "90px"
    };

    const onDeleteHandler = () => {
        if(window.confirm("Are you sure to delete this ingredient?"))
            props.onDelete(props.value.name);
    };

    return (
        <tr>
            <td className="py-3">{props.value.name}</td>
            <td className="py-3">{props.value.amount} g</td>
            <td className="py-3">{props.value.spicy.toString()}</td>
            <td className="py-3">{props.value.veggie.toString()}</td>
            <td className="py-2">
                <Link className="btn btn-sm btn-primary mr-1" style={myButtonStyle}
                      to={`/ingredients/${props.value.name}/edit`}>
                    <span className="fa fa-edit"/>
                    <span><strong> Edit</strong></span>
                </Link>
                <button className="btn btn-sm btn-danger mr-1 remove" style={myButtonStyle}
                        onClick={onDeleteHandler}>
                    <span className="fa fa-remove"/>
                    <span><strong> Remove</strong></span>
                </button>
                <Link className="btn btn-sm btn-info" style={myButtonStyle}
                      to={`/ingredients/${props.value.name}/details`}>
                    <span className="fa fa-info"/>
                    <span><strong> Details</strong></span>
                </Link>
            </td>
        </tr>
    );

};


export default ingredient;