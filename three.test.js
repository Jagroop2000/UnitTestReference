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
import AuthForgotPassword from "sections/auth/auth-forms/AuthForgotPassword";
import "@testing-library/jest-dom/extend-expect";
describe("Forget Password render Page", () => {
  it("Shows Forget Password Page", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    expect(getByText("Email Address"));
  });
  it("render  input components", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );
    expect(getByLabelText(/email/i));
  });

  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("forget-email"));
    });
  });

  it("should show validation error if email have only text in input field", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "test" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("forget-email"));
    });
    expect(screen.queryByTestId("email-invalid"));
  });

  it("show validation error if email contains 2 symbols together", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "asd@@sdf.df" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("email-invalid"));
  });

  it("Should accept value if email format  is correct ", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "sd@sd.ds" },
      });
    });
  });

  it("show validation error if email contains unusual format", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "df..fds@as.gg" },
      });
    });
  });

  it("show validation error if email contains number after dot", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "as@sds.123" },
      });
    });
  });

  it("show validation error if email starts with symbol", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "#dfd@sd.sd" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("email-invalid")).toBeInTheDocument();
  });

  it("show error if length increases 50", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthForgotPassword />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: {
          value:
            "abcdefghijklmnopqrstuvwxyzqwertyuiopasdfghjklzxcvbnmaaaaaaaaaa@gmail.comaaaaaaaaaaaaaaaaaa",
        },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("email-invalid")).toBeInTheDocument();
  });
});
