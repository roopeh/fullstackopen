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
      cy.request("POST", "http://localhost:3003/api/login/", testUser)
        .then((res) => {
          localStorage.setItem("loggedBlogUser", JSON.stringify(res.body))
        })

      cy.visit('http://localhost:3000');
    })

    it("New blog can be created", function createBlogTest() {
      cy.contains("New blog").click()
      cy.get("#blogTitle").type(testBlog.title)
      cy.get("#blogAuthor").type(testBlog.author)
      cy.get("#blogUrl").type(testBlog.url)
      cy.get("#createBlogButton").click()

      cy.contains(`A new blog ${testBlog.title} by ${testBlog.author} added`)
    })
  })

  describe("Testing existing blogs", function describeExistingBlogFunc() {
    beforeEach(function beforeEachBlog() {
      cy.request("POST", "http://localhost:3003/api/login/", testUser)
        .then((res) => {
          localStorage.setItem("loggedBlogUser", JSON.stringify(res.body))
        })

      cy.visit('http://localhost:3000');

      cy.contains("New blog").click()
      cy.get("#blogTitle").type(testBlog.title)
      cy.get("#blogAuthor").type(testBlog.author)
      cy.get("#blogUrl").type(testBlog.url)
      cy.get("#createBlogButton").click()
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
  })
})
