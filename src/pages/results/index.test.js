import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import Results from "./index";
import "@testing-library/jest-dom/extend-expect";

// import { App, LocationDisplay } from "./app";

test("renders results", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Results />
    </Router>
  );

  expect(screen.getByText(/results/i)).toBeInTheDocument();
});

// test("renders correct number of items", () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <Results />
//     </Router>
//   );
//   // verify page content for expected route
//   // often you'd use a data-testid or role query, but this is also possible
//   // expect(screen.getByText(/Book/i)).toBeInTheDocument();
//   // expect(screen.getByText(/Delight/i)).toBeInTheDocument();

//   // const leftClick = { button: 0 };
//   // userEvent.click(screen.getByTestId("header-search-button"), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/5 results/i)).toBeInTheDocument();
//   expect(screen.getAllByTestId("result-item").values;
// });