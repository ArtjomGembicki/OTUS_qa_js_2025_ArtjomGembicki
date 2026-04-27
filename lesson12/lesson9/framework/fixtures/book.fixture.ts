export interface BookData {
  isbn: string;
  title: string;
  subTitle: string;
  author: string;
  publish_date: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

export function generateBook(): BookData {
  const random = Math.floor(Math.random() * 100000);

  return {
    isbn: `${random}`,
    title: `Test Book ${random}`,
    subTitle: 'Automation Book',
    author: 'Artjom QA',
    publish_date: '2024-01-01T00:00:00.000Z',
    publisher: 'OTUS Publishing',
    pages: 123,
    description: 'Test book for API automation',
    website: 'https://example.com',
  };
}