import coreClient from '../services/coreApi';

export async function callChatbotAPI({ question, rating, userMessage, chatbotResponse, messageIdx }) {
  try {
    const payload = { question, rating, userMessage, chatbotResponse, messageIdx };
    const { status, data } = await coreClient.post('/chatbot', payload);

    if (status !== 200) {
      throw new Error('Failed to fetch the chatbot response');
    }

    return data.result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch the chatbot response');
  }
}


