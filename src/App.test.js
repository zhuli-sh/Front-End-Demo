import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

// import { App, LocationDisplay } from "./app";

test("full app rendering/navigating to sell", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/Book/i)).toBeInTheDocument();
  expect(screen.getByText(/Delight/i)).toBeInTheDocument();

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Sell/i), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();
});

test("upload photo navigating to detail form", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/Book/i)).toBeInTheDocument();
  expect(screen.getByText(/Delight/i)).toBeInTheDocument();

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Sell/i), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/Next/i), leftClick);
  expect(screen.getByText(/Tell Us More/i)).toBeInTheDocument();

});

test("detail form navigating to confirmation", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/Book/i)).toBeInTheDocument();
  expect(screen.getByText(/Delight/i)).toBeInTheDocument();

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Sell/i), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/Next/i), leftClick);
  expect(screen.getByText(/Tell Us More/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId("title-input"), "cal 3");
  userEvent.type(screen.getByTestId("subject-input"), "Math");
  userEvent.type(screen.getByTestId("isbn-input"), "0000000000000");
  userEvent.type(screen.getByTestId("price-input"), "80");

  userEvent.click(screen.getByText(/Next/i), leftClick);

  expect(screen.getByText(/Confirm/i)).toBeInTheDocument();


});


test("navigating to categories page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/browse by category/i), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/categories/i)).toBeInTheDocument();
});

test("navigating to search page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByTestId('searchButton'), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/results/i)).toBeInTheDocument();
});

test("search by title on home page by clicking search button", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  userEvent.type(screen.getByTestId('search-input'), "science");
  const leftClick = { button: 0 };
  userEvent.click(screen.getByTestId('searchButton'), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/science/i)).toBeInTheDocument();
});

test("search by isbn on home page by pressing Enter key", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  userEvent.type(screen.getByTestId('search-input'), "0000000000000");
  userEvent.type(screen.getByTestId('search-input'), '{enter}');

  // check that the content changed to the new page
  expect(screen.getByText(/0000000000000/i)).toBeInTheDocument();
});




test("render search bar in header in result page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByTestId('searchButton'), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/results/i)).toBeInTheDocument();

  expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

});

test("search by title with search bar in header in result page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByTestId('searchButton'), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/results/i)).toBeInTheDocument();

  expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

  userEvent.type(screen.getByTestId('header-search-input'), "science");

  userEvent.click(screen.getByTestId('header-search-button'), leftClick);

  expect(screen.getByText(/science/i)).toBeInTheDocument();

});

test("search by ISBN with search bar in header in result page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByTestId('searchButton'), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/results/i)).toBeInTheDocument();

  expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

  userEvent.type(screen.getByTestId('header-search-input'), "0000000000000");

  userEvent.click(screen.getByTestId('header-search-button'), leftClick);

  expect(screen.getByText(/0000000000000/i)).toBeInTheDocument();

});

test("search by pressing Enter key in search input in header in result page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByTestId('searchButton'), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/results/i)).toBeInTheDocument();

  expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

  userEvent.type(screen.getByTestId('header-search-input'), "0000000000000");

  userEvent.type(screen.getByTestId('header-search-input'), '{enter}');

  expect(screen.getByText(/0000000000000/i)).toBeInTheDocument();

});

test("navigate back to home page by clicking BookDelight", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByTestId('searchButton'), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/results/i)).toBeInTheDocument();

  expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('header-home-button'), leftClick);

  expect(screen.getByText(/browse by category/i)).toBeInTheDocument();

});






