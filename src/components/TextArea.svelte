<script>
	export let input;
</script>

<textarea
	on:keydown={(e) => {
		const shiftEnter = e.shiftKey && e.key === 'Enter';

		if (shiftEnter) {
			e.stopPropagation();
		} else if (e.key === 'Enter') {
			e.preventDefault();

			if (e.target instanceof HTMLTextAreaElement) {
				e?.target?.form?.requestSubmit();
			}
		}
	}}
	bind:value={$input}
	name="message"
	autocomplete="off"
	placeholder=" Message me :)"
	class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
/>
