/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

const testBlog = {
  title: "This is blog title",
  author: "Foo Bar",
  url: "127.0.0.1",
}

describe("Testing blog creation", () => {
  test("Test input fields", () => {
    const createFunctionMockHandler = jest.fn()

    render(
      <BlogForm
        createBlogFunction={createFunctionMockHandler}
        cancelBlogFunction={() => {}}
      />,
    )

    const inputUrl = screen.getByPlaceholderText("Url")
    const inputTitle = screen.getByPlaceholderText("Title")
    const inputAuthor = screen.getByPlaceholderText("Author")
    const createButton = screen.getByText("Create")

    userEvent.type(inputUrl, testBlog.url)
    userEvent.type(inputTitle, testBlog.title)
    userEvent.type(inputAuthor, testBlog.author)
    userEvent.click(createButton)

    expect(createFunctionMockHandler.mock.calls).toHaveLength(1)
    expect(createFunctionMockHandler.mock.calls[0][0].url).toBe(testBlog.url)
    expect(createFunctionMockHandler.mock.calls[0][0].title).toBe(testBlog.title)
    expect(createFunctionMockHandler.mock.calls[0][0].author).toBe(testBlog.author)
  })
})
