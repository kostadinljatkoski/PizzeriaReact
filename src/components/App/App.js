import React, { Component } from 'react';
import './App.css';
import pizza from '../../images/pizza.jpeg';
import {withRouter, Redirect, Route, Switch} from "react-router-dom";
import IngredientsService from '../../repository/ingredientsRepository';
import Header from '../Header/Header';
import IngredientsList from '../Ingredients/IngredientsList/IngredientsList';
import IngredientAdd from '../Ingredients/IngredientAdd/IngredientAdd';
import IngredientEdit from '../Ingredients/IngredientEdit/IngredientEdit';
import IngredientDetails from '../Ingredients/IngredientDetails/IngredientDetails';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients : [],
            size : 10,
            page : 0,
            totalPages : 0
        }
    }

    componentDidMount() {
        this.loadIngredients();
    }

    loadIngredients = (page = 0) => {

        IngredientsService.fetchIngredientsPaged(page, this.state.size).then(response => {
            this.setState({
                ingredients : response.data.content,
                size : response.data.size,
                page : response.data.number,
                totalPages : response.data.totalPages
            });
        });
    };

    createIngredient = (ingredient) => {
        IngredientsService.createIngredient(ingredient).then(response => {
           this.setState(prevState => {
               const ingredients = [...prevState.ingredients, response.data];
              return {ingredients}
           });
           this.loadIngredients();
           this.props.history.push("/ingredients");
        }).catch((error) => alert(error.response.data.message));
    };

    editIngredient = (ingredient, ingredientName) => {
        IngredientsService.editIngredient(ingredient, ingredientName).then(response => {
            const newIngredient = response.data;
            console.log("NEW INGREDIENT");
            console.log(newIngredient);
            this.setState(prevState => {
                const ingredients = prevState.ingredients.map(i => {
                   if(i.name === newIngredient.name) {
                       return newIngredient;
                   }
                   return i;
                });
                return {ingredients}
            });
            this.props.history.push("/ingredients");
      }).catch((error) => alert(error.response.data.message));
    };

    deleteIngredient = (name) => {
        IngredientsService.deleteIngredient(name).then(response => {
            this.setState(prevState => {
               const ingredients = prevState.ingredients.filter(i => i.name !== name);
               return {ingredients}
            });
        });
    };

    searchIngredient = (term) => {
       if(!term || term === "") {
           this.state = {
               ingredients : [],
               size : 10,
               page : 0,
               totalPages : 0
           };
           this.loadIngredients();
       }
       else {
           IngredientsService.searchIngredients(term).then(response => {
               this.setState({
                   ingredients : response.data,
                   size : 0,
                   page : 0,
                   totalPages : 0
               });
               this.props.history.push("/ingredients");
           });
       }
    };

    render() {

    return (
      <div className="App">
          <Header onSearch={this.searchIngredient}/>
          <div className="container mt-5">
              <Switch>
                  <Route path={"/"} exact>
                      <h1 className="mb-5">WELCOME TO MY PIZZA SITE</h1>
                      <img src={pizza} alt={"pizza"}/>
                  </Route>
                  <Route path={"/pizzas"} exact>
                      <h1>PIZZAS</h1>
                  </Route>
                  <Route path={"/ingredients"} exact>
                      <IngredientsList  ingredients={this.state.ingredients}
                                        onPageChange={this.loadIngredients}
                                        totalPages={this.state.totalPages}
                                        page={this.state.page}
                                        onDelete={this.deleteIngredient}/>
                  </Route>
                  <Route path={"/ingredients/new"} exact>
                      <IngredientAdd createIngredient={this.createIngredient}/>
                  </Route>
                  <Route path={"/ingredients/:ingredientName/edit"} exact>
                      <IngredientEdit editIngredient={this.editIngredient}/>
                  </Route>
                  <Route path={"/ingredients/:ingredientName/details"} exact>
                    <IngredientDetails/>
                  </Route>
                  <Redirect to={"/"}/>
              </Switch>
          </div>
      </div>
    );
  }
}

export default withRouter(App);
