import React from 'react';
import {NavLink} from "react-router-dom";
import FormSearch from '../FormSearch/FormSearch';

const header = props => {

    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <NavLink className="navbar-brand" to={"/"}>Home</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/pizzas"}>Pizzas</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink className="nav-link" to={"/ingredients"}>Ingredients</NavLink>
                        </li>
                    </ul>
                    <FormSearch onSearch={props.onSearch}/>
                    <form className="form-inline mt-2 mt-md-0 ml-3">
                        <button type="button" className="btn btn-outline-info my-2 my-sm-0">Login</button>
                    </form>
                </div>
            </nav>
        </header>
    )
};

export default header;