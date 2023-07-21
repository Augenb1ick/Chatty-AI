
// Замените ваш_ключ_к_api на ваш ключ Google Search API
const GOOGLE_API_KEY = 'AIzaSyCcTDyTdztISm4EavUT6eGseqtVPX9Mdxw';
const GOOGLE_SEARCH_ENGINE_ID = '36b00bb60a7184f12';

// Функция для выполнения запроса к Google Search API
async function searchGoogle(query: string) {
  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`);
    const data = await response.json();

    // Получаем результаты поиска из data.items
    const searchResults = data.items;
    return searchResults;
  } catch (error) {
    console.error('Ошибка при запросе к Google Search API:', error);
    return [];
  }
}

// Пример использования OpenAI API
// Замените ваш_ключ_к_api на ваш ключ OpenAI API
const OPENAI_API_KEY = 'ваш_ключ_к_api';

// Функция для выполнения запроса к OpenAI API
async function interactWithOpenAI(text) {
  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + OPENAI_API_KEY,
      },
      body: JSON.stringify({
        prompt: text,
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    // Получаем ответ от OpenAI из data.choices[0].text
    const openAIResponse = data.choices[0].text;
    return openAIResponse;
  } catch (error) {
    console.error('Ошибка при запросе к OpenAI API:', error);
    return '';
  }
}

// Пример использования обеих функций вместе
async function searchAndInteract(query: string) {
  try {
    // Выполняем запрос к Google Search API
    const searchResults = await searchGoogle(query);

    // Извлекаем первый результат из списка результатов поиска
    const firstResult = searchResults.length > 0 ? searchResults[0].snippet : '';

    // Выполняем запрос к OpenAI API
    const openAIResponse = await interactWithOpenAI(firstResult);

    console.log('Результаты поиска:', searchResults);
    console.log('Ответ от OpenAI:', openAIResponse);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

// Пример использования функции searchAndInteract
searchAndInteract('как правильно ухаживать за собакой');