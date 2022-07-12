Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login/", { username, password })
    .then((res) => {
      localStorage.setItem("loggedBlogUser", JSON.stringify(res.body))
      cy.visit("http://localhost:3000")
    })
})

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.contains("New blog").click()
  cy.get("#blogTitle").type(title)
  cy.get("#blogAuthor").type(author)
  cy.get("#blogUrl").type(url)
  cy.get("#createBlogButton").click()
})

Cypress.Commands.add("createMultipleBlogs", (blogs) => {
  blogs.forEach((blog) => {
    cy.get("#blogTitle").type(blog.title)
    cy.get("#blogAuthor").type(blog.author)
    cy.get("#blogUrl").type(blog.url)
    cy.get("#createBlogButton").click()
  })
})

Cypress.Commands.add("clickLikeButton", (title) => {
  cy.contains(title).contains("Like").click()
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500)
})
