import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useParams, useHistory} from "react-router-dom";
import IngredientsService from "../../../repository/ingredientsRepository";

const ingredientEdit = props => {

    const history = useHistory();
    const [ingredient, setIngredient] = useState({});
    const [initialIngredient, setInitialIngredient] = useState({});
    const {ingredientName} = useParams();

    useEffect(() => {
        IngredientsService.getIngredient(ingredientName).then(response => {
            setIngredient({...response.data});
            setInitialIngredient({...response.data});
        });
    }, []); //PRAZNI SREDNI ZAGRADI ZA DA SE POVIKA SAMO NA POCETOK

    const myFormStyle = {
        width : "60%",
        margin : "5% auto"
    };

    const myButtonStyle = {
        width: "80px"
    };

    const myPointerStyle = {
        cursor : "pointer"
    };

    const onResetClickHandler = e => {
        const amountInput = document.getElementById("amount");
        amountInput.value = initialIngredient.amount;
        document.getElementById("veggie").checked = initialIngredient.veggie;
        document.getElementById("spicy").checked = initialIngredient.spicy;
        setIngredient({...initialIngredient});
        const isAmountValid = amountInput.value.length > 0 && amountInput.value.length <= 10;
        document.getElementById("submitButton").disabled = !isAmountValid;
    };

    const onFromSubmitHandler = event => {
        event.preventDefault();
        const newIngredient = {
            amount : event.target.amount.value,
            veggie : event.target.veggie.checked,
            spicy : event.target.spicy.checked
        };
        props.editIngredient(newIngredient, ingredientName);
    };

    const onChangeHandler = e => {
        const paramName = e.target.name;
        const newIngredient = {...ingredient};
        if(paramName === "amount")
            newIngredient[paramName] = e.target.value;
        else
            newIngredient[paramName] = e.target.checked;
        setIngredient(newIngredient);
        const isAmountValid = e.target.value.length > 0 && e.target.value.length <= 10;
        document.getElementById("submitButton").disabled = !isAmountValid;
    };

    return (
        <div className="row">
            <form id="edit-ingredient-form" className="card p-4" style={myFormStyle} onSubmit={onFromSubmitHandler}>
                <h4 className="text-upper text-left mb-5">Edit Ingredient</h4>
                <div className="form-group row">
                    <label htmlFor="ingredient" className="col-sm-4 offset-sm-1 text-right">Ingredient name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="ingredient" placeholder="Ingredient name" name="name"
                               defaultValue={ingredientName}
                               readOnly={true}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-right">Amount</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="amount" placeholder="Amount" name="amount"
                                defaultValue={ingredient.amount}
                                onChange={onChangeHandler}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="veggie" className="col-sm-4 offset-sm-1 text-right">Veggie</label>
                    <div className="col-sm-1">
                        <input style={myPointerStyle} type="checkbox" className="form-control" id="veggie" name="veggie"
                               defaultChecked={ingredient.veggie}
                                onChange={onChangeHandler}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="spicy" className="col-sm-4 offset-sm-1 text-right">Spicy</label>
                    <div className="col-sm-1">
                        <input style={myPointerStyle} type="checkbox" className="form-control" id="spicy" name="spicy"
                                defaultChecked={ingredient.spicy}
                                onChange={onChangeHandler}/>
                    </div>
                </div>

                <div className="form-group row mt-3">
                    <div className="offset-5 col-6">
                        <Link
                            className="btn btn-danger float-right"
                            style={myButtonStyle}
                            to={"/ingredients"}>
                            Cancel
                        </Link>
                        <button
                            type="button"
                            className="btn btn-warning float-right mx-2"
                            style={myButtonStyle}
                            onClick={onResetClickHandler}>
                            Reset
                        </button>
                        <button
                            id="submitButton"
                            type="submit"
                            className="btn btn-primary float-right"
                            style={myButtonStyle}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )

};

export default ingredientEdit;