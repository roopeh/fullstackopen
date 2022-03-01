/* eslint-disable prefer-arrow-callback */

describe("Blog app", function describeFunc() {
  const testUser = {
    name: "Test User",
    username: "test123",
    password: "test123",
  }

  const testBlog = {
    title: "This is test blog",
    author: "roopeh",
    url: "github.com",
  }

  beforeEach(function beforeEachFunc() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users/", testUser)
    cy.visit("http://localhost:3000")
  })
  it("Login form is shown", function loginFormTest() {
    cy.contains("Login to application")
    cy.contains("Username")
    cy.contains("Password")
    cy.contains("Login")
  })

  describe("Testing login", function describeLoginFunc() {
    it("Login should fail with wrong credentials", function badLoginTest() {
      cy.get("#username").type("WrongUsername")
      cy.get("#password").type("WrongPassword")
      cy.get("#loginButton").click()

      cy.get(".error")
        .should("contain", "Invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
    })

    it("Login should work with correct credentals", function normalLoginTest() {
      cy.get("#username").type(testUser.username)
      cy.get("#password").type(testUser.password)
      cy.get("#loginButton").click()

      cy.contains(`Welcome ${testUser.name}`)
    })
  })

  describe("Testing new blog", function describeBlogFunc() {
    beforeEach(function beforeEachBlog() {
      cy.login(testUser)
    })

    it("New blog can be created", function createBlogTest() {
      cy.createBlog(testBlog)
      cy.contains(`A new blog ${testBlog.title} by ${testBlog.author} added`)
    })
  })

  describe.only("Testing existing blogs", function describeExistingBlogFunc() {
    beforeEach(function beforeEachBlog() {
      cy.login(testUser)
      cy.createBlog(testBlog)
    })

    it("Blog can be liked", function likeBlogTest() {
      cy.contains("View").click()
      cy.contains("Like").click()
      cy.contains("Likes 1")
    })

    it("Blog can be removed", function removeBlogTest() {
      cy.contains("View").click()
      cy.contains("Remove").click()
      cy.should("not.contain", testBlog.title)
    })

    it("Blog cannot be removed by other user", function removeBlogOtherTest() {
      cy.request("POST", "http://localhost:3003/api/users/", {
        username: "NewUser",
        password: "123",
      })

      cy.login({ username: "NewUser", password: "123" })

      cy.contains("View").click()
      cy.should("not.contain", "Remove")
    })

    it.only("Blogs are ordered by likes", function blogOrderTest() {
      cy.createMultipleBlogs([
        {
          title: "First Blog",
          author: "roopeh",
          url: "localhost",
        },
        {
          title: "Second Blog",
          author: "roopeh",
          url: "localhost",
        },
        {
          title: "Third Blog",
          author: "roopeh",
          url: "localhost",
        },
      ])

      cy.contains("First Blog").contains("View").click()
      cy.clickLikeButton("First Blog")
      cy.contains("Second Blog").contains("View").click()
      cy.clickLikeButton("Second Blog")
      cy.clickLikeButton("Second Blog")
      cy.clickLikeButton("Second Blog")
      cy.contains("Third Blog").contains("View").click()
      cy.clickLikeButton("Third Blog")
      cy.clickLikeButton("Third Blog")

      // cy.contains("First Blog").contains("Hide").click()
      // cy.contains("Second Blog").contains("Hide").click()
      // cy.contains("Third Blog").contains("Hide").click()

      cy.contains(testBlog.title).contains("View").click()
      cy.get(".blogBlock").eq(0).contains("Second Blog")
      cy.get(".blogBlock").eq(1).contains("Third Blog")
      cy.get(".blogBlock").eq(2).contains("First Blog")
    })
  })
})
