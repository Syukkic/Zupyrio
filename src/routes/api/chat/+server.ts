import { AZURE_OPENAI_API_KEY, ENDPOINT_URL, API_VERSION } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai-edge';
import type { RequestHandler } from '@sveltejs/kit';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const config = new Configuration({
	apiKey: AZURE_OPENAI_API_KEY,
	baseOptions: {
		headers: {
			'api-key': AZURE_OPENAI_API_KEY
		}
	},
	basePath: ENDPOINT_URL,
	defaultQueryParams: new URLSearchParams({
		'api-version': API_VERSION
	})
});

const openai = new OpenAIApi(config);

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();

	const response = await openai.createChatCompletion({
		model: 'gpt-4o',
		stream: true,
		messages: messages.map((message: any) => ({
			content: message.content,
			role: message.role
		}))
	});

	const stream = OpenAIStream(response);
	// Respond with the stream
	return new StreamingTextResponse(stream);
};
