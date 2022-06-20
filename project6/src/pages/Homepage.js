import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");

  const auth = "563492ad6f91700001000001c15f58ca135c48a9a77ac048d4d95bd5";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  // fetch data from pixels api
  const search = async (url) => {
    setPage(2); // next time start from 2
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });

    let parseData = await dataFetch.json();
    setData(parseData.photos);
  };

  // load more picture
  const morepicture = async () => {
    let newURL;
    if (input === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=${page}`;
    }
    setPage(page + 1);

    // fetch data from pixels api
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });

    let parseData = await dataFetch.json();
    setData(data.concat(parseData.photos));
  };

  // fetch data when the page loads up
  useEffect(() => {
    search(initialURL);
  }, []);

  // (a) --> when currentSearch change-> execute
  useEffect(() => {
    if (currentSearch === "") {
      search(initialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "80vh" }}>
      {/* bring func into search*/}
      {/* 傳function name 直接丟 */}
      {/* <Search search={search} setInput={setInput}></Search> */}
      {/* 傳function 帶參數要arrow function */}
      <Search
        search={() => {
          // JS closure 很重要，有影響 --> (a) useState hook not updating
          setCurrentSearch(input); // update when buttion click
          console.log(input);
          console.log(searchURL);
          // search(searchURL); // (a.sol) change to
        }}
        setInput={setInput}
      ></Search>
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d}></Picture>;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morepicture}>LoadMore</button>
      </div>
    </div>
  );
};

export default Homepage;
