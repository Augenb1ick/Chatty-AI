import React, { FC, useState, useEffect } from 'react';

type ChatbotProps = {
  textFromVoice: string
}

const Chatbot: FC<ChatbotProps> = ({ textFromVoice }) => {
  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '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';
  const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": prompt ? prompt : textFromVoice }],
      "temperature": 0,
      "max_tokens": 1000,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
  }

  useEffect(() => {
    textFromVoice && postToGpt()
  },[textFromVoice])

  async function postToGpt() {
    setLoading(true)
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setApiResponse(data.choices[0].message.content); 
    }).finally(() => {setLoading(false)})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    postToGpt()
    setPrompt('');
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            type='text'
            value={prompt}
            placeholder='Спросить ассистента'
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button disabled={loading || prompt.length === 0} type='submit'>
            Отправить
          </button>
          <br />{loading ? 'Генерирую ответ.' : ''}
        </form>
      </div>
      {apiResponse && (
        <div>
          <p>Ответ: {apiResponse}</p>
        </div>
      )}
    </>
  );
};

export default Chatbot;
