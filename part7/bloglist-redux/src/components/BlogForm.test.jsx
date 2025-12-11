import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const newBlog = {
    title: 'Praesentium quisquam impedit repudiandae maiores molestiae.',
    author: 'Jhon doe',
    url: 'http://flippant-fiber.info',
  }

  let createHandler

  beforeEach(() => {
    createHandler = vi.fn()

    render(<BlogForm createBlog={createHandler} />)
  })

  test('the form calls the create handler with the right details when a new blog is created.', async () => {
    const user = userEvent.setup()
    const saveBtn = screen.getByText('create')

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')

    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)

    await user.click(saveBtn)

    expect(createHandler.mock.calls).toHaveLength(1)
    expect(createHandler.mock.calls[0][0].title).toBe(newBlog.title)
    expect(createHandler.mock.calls[0][0].author).toBe(newBlog.author)
    expect(createHandler.mock.calls[0][0].url).toBe(newBlog.url)
  })
})
