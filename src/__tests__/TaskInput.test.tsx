import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskInput from "../components/TaskInput";

test("calls onAdd with input value", () => {
  const onAdd = jest.fn();

  render(<TaskInput onAdd={onAdd} />);

  const input = screen.getByPlaceholderText(/add a task/i);
  fireEvent.change(input, { target: { value: "Walk the dog" } });

  fireEvent.submit(input.closest("form")!);

  expect(onAdd).toHaveBeenCalledWith("Walk the dog");
});
