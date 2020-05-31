import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
  let { searchFilter } = props;
  let [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let query =
      searchInput.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${searchInput}"`;

    fetch(`https://hooks-primer.firebaseio.com/ingredients.json` + query)
      .then(res => res.json())
      .then(resData => {
        let responseArray = [];
        console.log("hi");

        for (let item in resData) {
          responseArray.push({
            id: item,
            title: resData[item].title,
            amount: resData[item].amount
          });
        }
        // searchFilter(responseArray);
      });
  }, [searchInput, searchFilter]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
