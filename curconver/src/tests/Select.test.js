import { render, fireEvent } from "@testing-library/react";
import Select from "../components/Select";

test("Select render test", () => {
    const { getByText } = render(<Select />);
    const select = getByText("Select...");
    expect(select).toBeVisible();
});;

// TODO: Add more unit tests