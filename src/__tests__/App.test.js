import React from "react";
import { render } from "@testing-library/react";
import { create } from "react-test-renderer";
import App from "../App";
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Testing App.js", () => {
  test("renders hello world", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Taking a snapshot and comparing", () => {
    let tree = create(<App />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
