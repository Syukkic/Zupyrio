<script lang="ts">
	import { useChat } from '@ai-sdk/svelte';
	import Message from './Message.svelte';
    import TextArea from './TextArea.svelte';

	const { input, handleSubmit, messages } = useChat();
	let messageContainer: HTMLElement | null;
	const scrollToButtom = () => {
		if (messageContainer) {
			messageContainer.scroll({
				top: messageContainer.scrollHeight,
				behavior: 'smooth'
			});
		}
	};

	$: {
		if ($messages) {
			scrollToButtom();
		}
	}
</script>

<div
	bind:this={messageContainer}
	class=" flex flex-col space-y-4 p-3 overflow-y-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mt-auto"
>
	{#each $messages as message}
		<Message {message} />
	{/each}
</div>

<div class="px-4 pt-4 mb-2 sm:mb-0 flex flex-col justify-between">
	<div class="m-10">
		<form
			class="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
			on:submit={handleSubmit}
		>
			<TextArea {input} />
			<button
				type="submit"
				class="p-4 font-bold bg-slate-700 text-white transition-colors duration-200"
				>Send
			</button>
		</form>
	</div>
</div>

<style lang="postcss">
	.scrollbar-w-2::-webkit-scrollbar {
		@apply w-1 h-1;
	}

	.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
		@apply bg-slate-200;
	}

	.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
		@apply bg-slate-400;
	}

	.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
		@apply rounded;
	}
</style>