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

    beforeEach(() => {
        render(<Blog blog={testBlog} />);
    });

    afterEach(() => {
        screen.debug(screen.container);
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
});
