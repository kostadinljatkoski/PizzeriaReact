import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";

const ingredientsList = props => {


    const ingredients = () => {
      return props.ingredients.map(ingredient =>
          <Ingredient key={ingredient.name} value={ingredient} onDelete={props.onDelete}/>
      );
    };

    const showIngredients = () => {
        return (
            <div className="row">
                <h3 className="text-upper text-left">Ingredients</h3>
                <div className="table-responsive">
                    <table className="table tr-history table-striped small">
                        <thead>
                        <tr>
                            <th className="py-3" scope="col">Name</th>
                            <th className="py-3" scope="col">Amount</th>
                            <th className="py-3" scope="col">Spicy</th>
                            <th className="py-3" scope="col">Veggie</th>
                            <th className="py-3" scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ingredients()}
                        </tbody>
                    </table>
                </div>
                <Link className="btn btn-outline-primary" to={"/ingredients/new"}>
                    <span><strong>Add new ingredient</strong></span>
                </Link>
            </div>
        )
    };

    const handlePageClick = e => {
        props.onPageChange(e.selected);
    };

    const paginate = () => {
        if(props.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages} //broj na stranici
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={props.page}       //aktivna stranica
                               onPageChange={handlePageClick}  //handler za menuvanje na strana (sami go implementirame)
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}
                />
            )
        }

    };

    const myStyle = {
        cursor : "pointer"
    };

    let displayIngredients = () => {
        return <h1>Моментално нема ниту еден ingredient</h1>;
    };

    if(props.ingredients.length > 0) {
        displayIngredients = () => {
            return (
                <div>
                    {showIngredients()}
                    <div className="mt-5" style={myStyle}>
                        {paginate()}
                    </div>
                </div>
            )
        }
    }



    return (
        <div>
            {displayIngredients()}
        </div>

    )
};

export default ingredientsList;