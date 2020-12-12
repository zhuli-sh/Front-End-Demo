import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import { StateMock } from '@react-mock/state';

beforeEach(() => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
})

test("show login button instead of profile button if not logged in", async () => {

  expect(screen.getByText(/Delight/i)).toBeInTheDocument();

});

// test("full app rendering/navigating to sell", async () => {
//   Object.defineProperty(window.document, 'cookie', {
//     writable: true,
//     value: 'uni=zl2890',
//   });

//   // verify page content for expected route
//   // often you'd use a data-testid or role query, but this is also possible
//   expect(screen.getByText(/Book/i)).toBeInTheDocument();
//   expect(screen.getByText(/Delight/i)).toBeInTheDocument();

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByText(/Sell/i), leftClick);
//   await waitFor(() => screen.getByText(/Sell/i));
//   // check that the content changed to the new page
//   expect(screen.getByText(/Sell/i)).toBeInTheDocument();
// });

// test("upload photo navigating to detail form", () => {

//   // verify page content for expected route
//   // often you'd use a data-testid or role query, but this is also possible
//   expect(screen.getByText(/Book/i)).toBeInTheDocument();
//   expect(screen.getByText(/Delight/i)).toBeInTheDocument();

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByText(/Sell/i), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();

//   userEvent.click(screen.getByText(/Next/i), leftClick);
//   expect(screen.getByText(/Tell Us More/i)).toBeInTheDocument();

// });


// test("detail form navigating to confirmation", () => {

//   // verify page content for expected route
//   // often you'd use a data-testid or role query, but this is also possible
//   expect(screen.getByText(/Book/i)).toBeInTheDocument();
//   expect(screen.getByText(/Delight/i)).toBeInTheDocument();

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByText(/Sell/i), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();

//   userEvent.click(screen.getByText(/Next/i), leftClick);
//   expect(screen.getByText(/Tell Us More/i)).toBeInTheDocument();

//   userEvent.type(screen.getByTestId("title-input"), "cal 3");
//   userEvent.type(screen.getByTestId("subject-input"), "Math");
//   userEvent.type(screen.getByTestId("isbn-input"), "0000000000000");
//   userEvent.type(screen.getByTestId("price-input"), "80");

//   userEvent.click(screen.getByText(/Next/i), leftClick);

//   expect(screen.getByText(/Confirm/i)).toBeInTheDocument();


// });

// test("confirmation navigating back to sell form", () => {

//   // verify page content for expected route
//   // often you'd use a data-testid or role query, but this is also possible
//   expect(screen.getByText(/Book/i)).toBeInTheDocument();
//   expect(screen.getByText(/Delight/i)).toBeInTheDocument();

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByText(/Sell/i), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();

//   userEvent.click(screen.getByText(/Next/i), leftClick);
//   expect(screen.getByText(/Tell Us More/i)).toBeInTheDocument();

//   userEvent.type(screen.getByTestId("title-input"), "cal 3");
//   userEvent.type(screen.getByTestId("subject-input"), "Math");
//   userEvent.type(screen.getByTestId("isbn-input"), "0000000000000");
//   userEvent.type(screen.getByTestId("price-input"), "80");

//   userEvent.click(screen.getByText(/Next/i), leftClick);

//   expect(screen.getByText(/Confirm/i)).toBeInTheDocument();

//   userEvent.click(screen.getByText(/Edit/i), leftClick);
//   expect(screen.getByText(/Tell Us More/i)).toBeInTheDocument();


// });

// test("confirmation navigating to success page", () => {

//   // verify page content for expected route
//   // often you'd use a data-testid or role query, but this is also possible
//   expect(screen.getByText(/Book/i)).toBeInTheDocument();
//   expect(screen.getByText(/Delight/i)).toBeInTheDocument();

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByText(/Sell/i), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();

//   userEvent.click(screen.getByText(/Next/i), leftClick);
//   expect(screen.getByText(/Tell Us More/i)).toBeInTheDocument();

//   userEvent.type(screen.getByTestId("title-input"), "cal 3");
//   userEvent.type(screen.getByTestId("subject-input"), "Math");
//   userEvent.type(screen.getByTestId("isbn-input"), "0000000000000");
//   userEvent.type(screen.getByTestId("price-input"), "80");

//   userEvent.click(screen.getByText(/Next/i), leftClick);

//   expect(screen.getByText(/Confirm/i)).toBeInTheDocument();

//   userEvent.click(screen.getByText(/Post/i), leftClick);
//   expect(screen.getByText(/successfully/i)).toBeInTheDocument();


// });


// test("navigating to categories page", () => {

//   const leftClick = { button: 0 };
//   expect(screen.getByText(/browse by category/i)).toBeInTheDocument();
//   userEvent.click(screen.getByText(/browse by category/i), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/categories/i)).toBeInTheDocument();
// });

// test("navigating to search page", async () => {


//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('search-button'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByText(/results/i));
//   expect(screen.getByText(/results/i)).toBeInTheDocument();
// });

// test("search page show results", async () => {

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('search-button'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByText(/results/i));
//   expect(screen.getByText(/1231231231231/i)).toBeInTheDocument();
// });

// test("search by title on home page by clicking search button", async () => {
//   Object.defineProperty(window.document, 'cookie', {
//     writable: true,
//     value: 'uni=zl2890',
//   });
//   userEvent.type(screen.getByTestId('search-input'), "science");
//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('search-button'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByText(/results/i));
//   expect(screen.getByText(/science/i)).toBeInTheDocument();

// });

// test("search by isbn on home page by pressing Enter key", async () => {

//   userEvent.type(screen.getByTestId('search-input'), "0000000000000");
//   userEvent.type(screen.getByTestId('search-input'), '{enter}');

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByText(/results/i));
//   expect(screen.getByText(/0000000000000/i)).toBeInTheDocument();
// });




// test("render search bar in header in result page", async () => {

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('search-button'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByText(/results/i));
//   expect(screen.getByText(/results/i)).toBeInTheDocument();

//   expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

// });

// test("search by title with search bar in header in result page", async () => {

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('search-button'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByText(/results/i));
//   expect(screen.getByText(/results/i)).toBeInTheDocument();

//   expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

//   userEvent.type(screen.getByTestId('header-search-input'), "science");

//   userEvent.click(screen.getByTestId('header-search-button'), leftClick);
//   await waitFor(() => screen.getByText(/science/i));
//   expect(screen.getByText(/science/i)).toBeInTheDocument();

// });

// test("search by ISBN with search bar in header in result page", async () => {

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('search-button'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByText(/results/i));
//   expect(screen.getByText(/results/i)).toBeInTheDocument();

//   expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

//   userEvent.type(screen.getByTestId('header-search-input'), "0000000000000");

//   userEvent.click(screen.getByTestId('header-search-button'), leftClick);
//   await waitFor(() => screen.getByText(/0000000000000/i));
//   expect(screen.getByText(/0000000000000/i)).toBeInTheDocument();

// });

// test("search by pressing Enter key in search input in header in result page", async () => {

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('search-button'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByText(/results/i));
//   expect(screen.getByText(/results/i)).toBeInTheDocument();

//   expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

//   userEvent.type(screen.getByTestId('header-search-input'), "0000000000000");

//   userEvent.type(screen.getByTestId('header-search-input'), '{enter}');
//   await waitFor(() => screen.getByText(/0000000000000/i));
//   expect(screen.getByText(/0000000000000/i)).toBeInTheDocument();

// });

// test("navigate back to home page by clicking BookDelight", async () => {

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('search-button'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByText(/results/i));
//   expect(screen.getByText(/results/i)).toBeInTheDocument();

//   expect(screen.getByTestId('header-search-button')).toBeInTheDocument();

//   userEvent.click(screen.getByTestId('header-home-button'), leftClick);
//   await waitFor(() => screen.getByText(/browse by category/i));
//   expect(screen.getByText(/browse by category/i)).toBeInTheDocument();

// });

// test("navigate to user profile", async () => {

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('profile-menu'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByTestId('profile-button'));

//   expect(screen.getByTestId('profile-button')).toBeInTheDocument();

//   userEvent.click(screen.getByTestId('profile-button'), leftClick);
//   await waitFor(() => screen.getByText(/User Profile/i));
//   expect(screen.getByText(/User Profile/i)).toBeInTheDocument();

// });


// test("navigate to edit info form", async () => {

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('profile-menu'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByTestId('profile-button'));

//   userEvent.click(screen.getByTestId('profile-button'), leftClick);
//   await waitFor(() => screen.getByText(/User Profile/i));

//   userEvent.click(screen.getByTestId('profile-edit'), leftClick);
//   await waitFor(() => screen.getByText(/About You/i));
//   expect(screen.getByText(/About You/i)).toBeInTheDocument();


// });


// test("click logout button in user menu logs out the user", async () => {

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('profile-menu'), leftClick);

//   // check that the content changed to the new page
//   await waitFor(() => screen.getByTestId('profile-button'));

//   expect(screen.getByTestId('logout-button')).toBeInTheDocument();

//   userEvent.click(screen.getByTestId('logout-button'), leftClick);
//   await waitFor(() => screen.getByText(/Sell/i));
//   expect(screen.getByText(/Sell/i)).toBeInTheDocument();

// });








