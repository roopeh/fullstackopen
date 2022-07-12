import { useNavigate } from "react-router-dom"
import { useField } from "../hooks/"

const CreateNew = ({ addNew }) => {
  const content = useField("content")
  const author = useField("author")
  const info = useField("info")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    navigate("/")

    addNew({
      content: content.input.value,
      author: author.input.value,
      info: info.input.value,
      votes: 0
    })
  }

  const resetFields = () => {
    content.reset();
    author.reset();
    info.reset();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...info.input} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
