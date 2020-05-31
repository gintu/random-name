import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
  const { searchFilter } = props;
  let [searchInput, setSearchInput] = useState("");
  let inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === inputRef.current.value) {
        let query =
          searchInput.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${searchInput}"`;

        fetch(`https://hooks-primer.firebaseio.com/ingredients.json` + query)
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
            searchFilter(responseArray);
          });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput, searchFilter]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
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
