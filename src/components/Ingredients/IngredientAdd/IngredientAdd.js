import React from 'react';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";


const ingredientAdd = props => {

    const history = useHistory();

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
        e.preventDefault();
        document.getElementById("add-ingredient-form").reset();
        document.getElementById("submitButton").disabled = true;
    };

    const onFromSubmitHandler = event => {
        event.preventDefault();
        const newIngredient = {
            name : event.target.name.value,
            amount : event.target.amount.value,
            veggie : event.target.veggie.checked,
            spicy : event.target.spicy.checked
        };
        props.createIngredient(newIngredient);
    };

    const areNameAndAmountValid = event => {
      const nameLength = document.getElementById("ingredient").value.length;
      const amountLength = document.getElementById("amount").value.length;
      const valid = nameLength > 0 && nameLength <= 20 && amountLength > 0 && amountLength <= 10;
        document.getElementById("submitButton").disabled = !valid;
    };

    return (
        <div className="row">
            <form id="add-ingredient-form" className="card p-4" style={myFormStyle} onSubmit={onFromSubmitHandler}>
                <h4 className="text-upper text-left mb-5">Add Ingredient</h4>
                <div className="form-group row">
                    <label htmlFor="ingredient" className="col-sm-4 offset-sm-1 text-right">Ingredient name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="ingredient" placeholder="Ingredient name" name="name" onChange={areNameAndAmountValid}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-right">Amount</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="amount" placeholder="Amount" name="amount" onChange={areNameAndAmountValid}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="veggie" className="col-sm-4 offset-sm-1 text-right">Veggie</label>
                    <div className="col-sm-1">
                        <input style={myPointerStyle} type="checkbox" className="form-control" id="veggie" name="veggie"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="spicy" className="col-sm-4 offset-sm-1 text-right">Spicy</label>
                    <div className="col-sm-1">
                        <input style={myPointerStyle} type="checkbox" className="form-control" id="spicy" name="spicy"/>
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
                            className="btn btn-warning float-right mx-2"
                            style={myButtonStyle}
                            onClick={onResetClickHandler}>
                            Reset
                        </button>
                        <button
                            id="submitButton"
                            disabled
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

export default ingredientAdd;