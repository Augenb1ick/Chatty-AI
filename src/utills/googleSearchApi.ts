const baseUrl: string = 'https://www.googleapis.com/customsearch/';
const apiKey: string = import.meta.env.VITE_GOOGGLE_SEARCH_API_KEY;
const engineId: string = import.meta.env.VITE_GOOGGLE_SEARCH_ENGINE_ID;

export async function getSearchData(q: string): Promise<string> {
  try {
    const response = await fetch(
      `${baseUrl}v1?key=${apiKey}&cx=${engineId}&q=${encodeURIComponent(q)}`
    );
    const data = await response.json();

    const searchResults = data.items.map((item) => ({
      snippet: item.snippet,
      htmlTitle: item.htmlTitle,
      link: item.link,
    }));

    const finalResults = searchResults
      .map((result) =>
        [result.snippet, result.htmlTitle, result.link].join(',')
      )
      .join('');

    return finalResults;
  } catch (error) {
    console.error('Ошибка при запросе к Google Search API:', error);
    return '';
  }
}
