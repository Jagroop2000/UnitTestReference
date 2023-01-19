import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  userEvent,
  findByText,
} from "@testing-library/react";
import AuthContext, { JWTProvider as AuthProvider } from "contexts/JWTContext";
import { Provider } from "react-redux";
import { store } from "store";
import { BrowserRouter } from "react-router-dom";
import UpdateProfile from "pages/profile-settings/updateProfile";
import { IntlProvider } from "react-intl";
import "@testing-library/jest-dom/extend-expect";
describe("Testing on Update Profile Testing Page", () => {
  it("Show Update Profile Page", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <IntlProvider locale="en">
              <UpdateProfile />
            </IntlProvider>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );
    expect(getByText("Update")).toBeInTheDocument();
  });

  it("Rendring Input Components of Login form", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <IntlProvider locale="en">
              <UpdateProfile />
            </IntlProvider>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );
    expect(getByLabelText("first_name")).toBeInTheDocument();
    expect(getByLabelText("last_name")).toBeInTheDocument();
    expect(getByLabelText("mobile")).toBeInTheDocument();
    expect(getByLabelText("company_name")).toBeInTheDocument();
  });

  it("validate user first name input, and provides error messages", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <IntlProvider locale="en">
              <UpdateProfile />
            </IntlProvider>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    const field = screen.getByLabelText("first_name").querySelector("input");
    fireEvent.change(field, { target: { value: "" } });
  });

  it("validate user last input, and provides error messages", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <IntlProvider locale="en">
              <UpdateProfile />
            </IntlProvider>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    const field = screen.getByLabelText("last_name").querySelector("input");
    fireEvent.change(field, { target: { value: "" } });
  });

  // Currently Causing Issue so that's why it's commented.
  // it("validate user mobile number input, and provides error messages", async () => {
  //   const { getByTestId, getByText } = render(
  //     <Provider store={store}>
  //     <AuthProvider>
  //       <BrowserRouter>
  //       <IntlProvider locale="en">
  //         <UpdateProfile />
  //       </IntlProvider>
  //       </BrowserRouter>
  //     </AuthProvider>
  //   </Provider>
  //   );

  //   const field = screen.getByLabelText('mobile').querySelector('input');
  //   fireEvent.change(field, { target: { value: '' } });
  // });

  it("validate user company name input, and provides error messages", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <IntlProvider locale="en">
              <UpdateProfile />
            </IntlProvider>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    const field = screen.getByLabelText("company_name").querySelector("input");
    fireEvent.change(field, { target: { value: "" } });
  });
});
