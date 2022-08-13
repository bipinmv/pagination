import { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [sizePerPage, setSizePerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(todos.length / sizePerPage);
  const slicedPages = todos.slice(
    currentPage * sizePerPage - sizePerPage,
    currentPage * sizePerPage
  );

  const getPageNumberList = () => {
    const arrElements = [];
    for (let page = 1; page < totalPages + 1; page++) {
      arrElements.push(
        <span
          key={page}
          className={`page-number ${
            currentPage === page ? "page-number-active" : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </span>
      );
    }
    return arrElements;
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {slicedPages.map((obj) => (
        <h3 key={obj.id}>{obj.title}</h3>
      ))}

      <div>
        {currentPage > 1 && (
          <span
            className="page-number"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </span>
        )}
        {getPageNumberList()}
        {currentPage < totalPages && (
          <span
            className="page-number"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </span>
        )}
      </div>

      <select
        onChange={(e) => setSizePerPage(Number(e.target.value))}
        className="size-per-page"
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </>
  );
};

export default App;
