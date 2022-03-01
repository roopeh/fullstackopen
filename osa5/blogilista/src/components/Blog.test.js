/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

const testBlog = {
  title: "This is blog title",
  author: "Foo Bar",
  url: "127.0.0.1",
  likes: 1,
  user: {
    id: "13232342",
    name: "Test user",
  },
}

describe("Testing blogs", () => {
  let container
  let likeFunctionMockHandler

  beforeEach(() => {
    likeFunctionMockHandler = jest.fn()

    // Send empty functions to silence warnings about prop types
    container = render(
      <Blog
        blog={testBlog}
        removeBlogFunction={() => {}}
        updateBlogFunction={likeFunctionMockHandler}
        userid={testBlog.user.id}
      />,
    ).container
  })

  test("Test if title and author are rendered", () => {
    const div = container.querySelector(".blogBlock")
    expect(div).toHaveTextContent(testBlog.title)
    expect(div).toHaveTextContent(testBlog.author)
  })

  test("Blog url and likes should be hidden by default", () => {
    const div = container.querySelector(".blogData")
    expect(div).toHaveStyle("display: none")
  })

  test("Blog url and likes should be visible when clicked on button", () => {
    const button = screen.getByText("View")
    userEvent.click(button)

    const div = container.querySelector(".blogData")
    expect(div).not.toHaveStyle("display: none")
  })

  test("Clicking blog like button twice calls event handler function twice", () => {
    const viewButton = screen.getByText("View")
    userEvent.click(viewButton)

    const likeButton = screen.getByText("Like")
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(likeFunctionMockHandler.mock.calls).toHaveLength(2)
  })
})
