import React, { useState } from "react";
import produce from "immer";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo(props => {
  const [state, setState] = useState({ title: "", amount: "" });
  const submitHandler = event => {
    console.log(state);
    event.preventDefault();
    props.addUserIngredients(state);

    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={state.title}
              onChange={() =>
                setState(
                  produce(draft => {
                    draft.title = event.target.value;
                  })
                )
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={state.amount}
              onChange={() =>
                setState(
                  produce(draft => {
                    draft.amount = event.target.value;
                  })
                )
              }
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
