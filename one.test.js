import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  userEvent,
} from "@testing-library/react";
import AuthLogin from "sections/auth/auth-forms/AuthLogin";
import AuthContext, { JWTProvider as AuthProvider } from "contexts/JWTContext";
import { Provider } from "react-redux";
import { store } from "store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe.skip("Login render Page", () => {
  it("Shows Sign In", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );
    expect(getByText("Sign In")).toBeInTheDocument();
  });
  it("render 2 input components", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "" },
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    expect(getByText("Please enter the email.")).toBeInTheDocument();
    expect(getByText("Please enter the password.")).toBeInTheDocument();
  });

  it("should show validation error if email have only text in input field", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
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
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("email-invalid")).toBeInTheDocument();
  });

  it("should not show validation error if both inputs have correct inputs", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "test@gmail.com" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Test@12" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("password-invalid")).not.toBeInTheDocument();
    expect(screen.queryByTestId("email-invalid")).not.toBeInTheDocument();
  });

  it("show validation error if email contains 2 symbols together", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "asd@@sdf.df" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Test@12" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("email-invalid")).toBeInTheDocument();
  });

  it("Should accept value if email format  is correct ", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "sd@sd.ds" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Test@12" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("email-invalid")).not.toBeInTheDocument();
  });

  it("show validation error if email contains unusual format", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "df..fds@as.gg" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Test@12" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("email-invalid")).toBeInTheDocument();
  });

  it("show validation error if email contains number after dot", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "as@sds.123" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Test@12" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("email-invalid")).toBeInTheDocument();
  });

  it("show validation error if email starts with symbol", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "#dfd@sd.sd" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Test@12" },
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
            <AuthLogin />
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
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Test@12" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    expect(screen.queryByTestId("email-invalid")).toBeInTheDocument();
  });

  it("find checkbox with label Remember me and onclick it will be checked", async () => {
    render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );
    const checkboxLabel = screen.getByLabelText("Remember Me");

    expect(screen.queryByRole("checkbox")).not.toBeChecked();
    expect(checkboxLabel).toHaveStyle("display: inline-block");
    await act(async () => {
      fireEvent.click(screen.getByRole("checkbox"));
    });
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(checkboxLabel).toHaveStyle("display: inline-block");
  });

  it("check if sign in button clicks", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    const button = getByTestId("form");
    await act(async () => {
      fireEvent.click(button);
    });
  });

  it("check if forgot password link is present", async () => {
    render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    const linkEl = screen.getByRole("link", { name: "Forgot Password?" });
    expect(linkEl).toHaveAttribute("href", "/forgot-password");
  });
  it("allow user not to login if remember me is not checked", async () => {
    // mock window.fetch for the test

    const UserResponse = { token: "serviceToken" };

    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(UserResponse),
      });
    });

    // Render the Login component
    const { getByTestId } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    // fill out the form
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "ravi@yopmail.com" },
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Ztech@44" },
      });
    });

    //Submit the form
    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    // Expect local token to be set
    expect(window.localStorage.getItem("serviceToken")).not.toEqual(
      UserResponse.token
    );
  });

  it("allows the user to login successfully on remember me checked", async () => {
    // mock window.fetch for the test
    const UserResponse = { token: "serviceToken" };

    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(UserResponse),
      });
    });

    // Render the Login component
    const { getByTestId } = render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <AuthLogin />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    // fill out the form
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "ravi@yopmail.com" },
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "Ztech@44" },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("checkbox"));
    });

    //Submit the form
    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    // Expect local token to be set
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(window.localStorage.getItem("token")).toEqual(UserResponse.token);
  });
});
