export function generateBook() {
  const random = Math.floor(Math.random() * 100000);

  return {
    isbn: `${random}`,
    title: `Test Book ${random}`,
    subTitle: "Automation Book",
    author: "Artjom QA",
    publish_date: "2024-01-01T00:00:00.000Z",
    publisher: "OTUS Publishing",
    pages: 123,
    description: "Test book for API automation",
    website: "https://example.com"
  };
}