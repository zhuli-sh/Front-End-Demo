// import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { createMemoryHistory } from "history";
// import React from "react";
// import { Router } from "react-router-dom";
// import App from "./App";
// import "@testing-library/jest-dom/extend-expect";

// // import { App, LocationDisplay } from "./app";

// test("full app rendering/navigating", () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <App />
//     </Router>
//   );
//   // verify page content for expected route
//   // often you'd use a data-testid or role query, but this is also possible
//   expect(screen.getByText(/Book/i)).toBeInTheDocument();
//   expect(screen.getByText(/Delight/i)).toBeInTheDocument();

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByText(/Sell/i), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();
// });

// test("navigating to categories page", () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <App />
//     </Router>
//   );

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByText(/browse by category/i), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/categories/i)).toBeInTheDocument();
// });

// test("navigating to search page", () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <App />
//     </Router>
//   );

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByText(/Go/i), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/results/i)).toBeInTheDocument();
// });
