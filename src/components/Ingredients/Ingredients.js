import React, { useState, useEffect, useCallback, useReducer } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const ingredientReducer = (currentState, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentState, action.ingredient];
    case "DELETE":
      return currentState.filter(item => item.id !== action.id);
  }
};

const httpReducer = (currentState, action) => {
  switch (action.type) {
    case "SENT":
      return { error: null, loading: true };
    case "RESPONSE":
      return { ...currentState, loading: false };
    case "ERROR":
      return { loading: false, error: action.msg };
    case "CLEAR":
      return { ...currentState, error: null };
  }
};

const Ingredients = () => {
  let [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  const [httpStates, httpDispatch] = useReducer(httpReducer, {
    loading: false,
    error: null
  });

  let searchFilter = useCallback(ingredients => {
    dispatch({ type: "SET", ingredients });
  }, []);

  useEffect(() => {
    console.log("component rerendered");
    console.log(httpStates);
  });

  let onAddUnserIngredients = ingredient => {
    httpDispatch({ type: "SENT" });
    fetch(`https://hooks-primer.firebaseio.com/ingredients.json`, {
      method: "post",
      body: JSON.stringify(ingredient),
      contentType: "application/json"
    })
      .then(res => res.json)
      .then(resData => {
        httpDispatch({ type: "RESPONSE" });

        dispatch({
          type: "ADD",
          ingredient: {
            id: resData.name,
            title: ingredient.title,
            amount: ingredient.amount
          }
        });
      });
  };

  let onRemoveItem = id => {
    httpDispatch({ type: "SENT" });
    fetch(`https://hooks-primer.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE"
    }).then(res => {
      httpDispatch({ type: "RESPONSE" });
      // let arrayAfterRemoval = userIngredients.filter(item => item.id !== id);
      dispatch({ type: "DELETE", id });
    });
  };

  return (
    <div className="App">
      <IngredientForm
        addUserIngredients={onAddUnserIngredients}
        loading={httpStates.loading}
      />

      <section>
        <Search searchFilter={searchFilter} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={onRemoveItem}
        />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
