import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
    const testBlog = {
        title: 'testing blog',
        author: 'Jhon doe',
        url: 'http://flippant-fiber.info',
        likes: 1000,
    };

    let updateHandler;

    beforeEach(() => {
        updateHandler = vi.fn();

        render(<Blog blog={testBlog} updateBlog={updateHandler} />);
    });

    test('at start the title displayed and not render URL and likes by default', () => {
        screen.getByText(`${testBlog.title}`);
        const url = screen.queryByText(testBlog.url);
        const likes = screen.queryByText(testBlog.likes);

        expect(url).toBeNull();
        expect(likes).toBeNull();
    });

    test('URL and likes shown when the view button clicked.', async () => {
        const user = userEvent.setup();
        const viewBtn = screen.getByText('view');

        await user.click(viewBtn);

        const url = screen.queryByText(testBlog.url);
        const likes = screen.queryByText(`likes ${testBlog.likes}`);

        expect(url).toBeVisible();
        expect(likes).toBeVisible();
    });

    test('when like button is clicked twice the like handler is called twice', async () => {
        const user = userEvent.setup();
        const viewBtn = screen.getByText('view');

        await user.click(viewBtn);

        const likeBtn = screen.getByText('like');

        await user.click(likeBtn);
        await user.click(likeBtn);

        expect(updateHandler.mock.calls).toHaveLength(2);
    });
});
