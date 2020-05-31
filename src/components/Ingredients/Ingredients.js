import React, { useState, useEffect } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch(`https://hooks-primer.firebaseio.com/ingredients.json`)
      .then(res => res.json())
      .then(resData => {
        let responseArray = [];

        for (let item in resData) {
          responseArray.push({
            id: item,
            title: resData[item].title,
            amount: resData[item].amount
          });
        }
        setUserIngredients(responseArray);
      });
  }, []);

  let searchFilter = ingredients => {
    setUserIngredients(ingredients);
  };

  let onAddUnserIngredients = ingredient => {
    fetch(`https://hooks-primer.firebaseio.com/ingredients.json`, {
      method: "post",
      body: JSON.stringify(ingredient),
      contentType: "application/json"
    })
      .then(res => res.json)
      .then(resData => {
        setUserIngredients(prev => [
          ...prev,
          {
            id: resData.name,
            title: ingredient.title,
            amount: ingredient.amount
          }
        ]);
      });
  };
  return (
    <div className="App">
      <IngredientForm addUserIngredients={onAddUnserIngredients} />

      <section>
        <Search searchFilter={searchFilter} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
