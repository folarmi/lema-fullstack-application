import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostCard } from "../components/cards/PostCard";

describe("PostCard", () => {
  const mockOnDelete = jest.fn();
  const title = "Sample Title";
  const post = "This is a sample post body.";
  const id = "af5d515cef0c4ce3bbbb2d10b0349494";

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it("renders title and post content correctly", () => {
    const { getByText } = render(
      <PostCard id={id} title={title} post={post} onDelete={mockOnDelete} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(post)).toBeInTheDocument();
  });

  it("calls onDelete when delete icon is clicked", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(
      <PostCard id={id} title={title} post={post} onDelete={mockOnDelete} />
    );

    const deleteIcon = getByTestId("delete-icon");
    await user.click(deleteIcon);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
