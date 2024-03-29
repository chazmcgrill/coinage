import { describe, it } from 'vitest';
import fetcher from './fetcher';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fetch from 'vitest-fetch-mock';

describe('fetcher', () => {
    const mockData = {
        name: 'John Doe',
        age: 30,
    };

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should make a GET request to the provided URL and path', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const url = 'https://example.com';
        const path = 'users';
        const result = await fetcher<typeof mockData>('GET', url, path);

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0]).toEqual(`${url}/${path}`);
        expect(fetchMock.mock.calls[0][1]).toEqual({ method: 'GET', headers: { Accept: 'application/json' } });
        expect(result).toEqual(mockData);
    });

    it('should make a POST request to the provided URL and path with the provided data', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const url = 'https://example.com';
        const path = 'users';
        const body = { foo: 'bar ' };
        const result = await fetcher<typeof mockData, typeof body>('POST', url, path, body);

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0]).toEqual(`${url}/${path}`);
        expect(fetchMock.mock.calls[0][1]).toEqual({
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: JSON.stringify(body),
        });
        expect(result).toEqual(mockData);
    });

    it('should handle a non-200 status code', async () => {
        fetchMock.mockReject(new Error('404 Not Found'));

        try {
            await fetcher('GET', 'https://example.com', 'users');
        } catch (error) {
            expect((error as Error).message).toEqual('404 Not Found');
        }
    });
});
