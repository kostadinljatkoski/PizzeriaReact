import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import IngredientsService from "../../../repository/ingredientsRepository";
import ingredientsImg from '../../../images/ingredients.jpg';
import PizzasList from '../../Pizzas/PizzasList/PizzasList';

const ingredientDetails = props => {

    const [ingredient, setIngredient] = useState({});
    const [pizzas, setPizzas] = useState([]);
    const {ingredientName} = useParams();
    useEffect(() => {
        IngredientsService.getIngredient(ingredientName).then(response1 => {
            setIngredient(response1.data);
            IngredientsService.getAllPizzasWithIngredient(ingredientName).then(response2 => {
               setPizzas(response2.data);
            });
        });
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <img src={ingredientsImg} className="img-fluid" alt={"..."}/>
                </div>
                <div className="col-6">
                    {showIngredientDetails()}
                </div>
            </div>
        </div>
    );

    function showIngredientDetails() {
        return (
            <div className="card text-left">
                <div className="card-header">
                    <h5>{ingredient.name}</h5>
                </div>
                <div className="card-body">
                    <h6 className="card-title">About this ingredient:</h6>
                    <ul>
                        <li>Amount: {ingredient.amount}</li>
                        <li>Veggie: {ingredient.veggie ? "true" : "false"}</li>
                        <li>Spicy: {ingredient.spicy ? "true" : "false"}</li>
                    </ul>
                </div>
                <div className="card-footer">
                    <h6>Pizzas containing this ingredient: </h6>
                    <PizzasList pizzas={pizzas}/>
                </div>
            </div>
        )
    }

};

export default ingredientDetails;