import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  
  test("renders TodoList component", () => {
  render(<TodoList />);
  const headerElement = screen.getByText(/todo list/i);
  expect(headerElement).toBeInTheDocument();
});

  test("adds a new todo", () => {
    render(<TodoList />);

    const input = screen.getByLabelText("todo-input");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("toggles a todo", () => {
    render(<TodoList />);

    const todo = screen.getByText("Learn React");
    expect(todo).toHaveStyle("text-decoration: none");

    fireEvent.click(todo);

    expect(todo).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
  
    const todo = screen.getByText("Build a Todo App");
    const deleteButton = todo.nextSibling;

    fireEvent.click(deleteButton);

    expect(screen.queryByText("Build a Todo App")).toBeNull();
  });
});
