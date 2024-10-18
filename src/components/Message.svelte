<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';

  type Message = {
    role: string;
    content: string;
  };
  export let message: Message;
  let source = "";


  $: {
    source = message.content;
  }
</script>

<div class={`flex items-end ${message.role === 'user' ? 'justify-end' : ''}`}>
  <div
    class={`flex flex-col space-y-4 text-base mx-2 ${
      message.role === 'user' ? 'order-1 items-end' : 'order-2 items-start'
    }`}
  >
    <div>
      <span
        class={`px-2 py-2 rounded-lg inline-block shadow-md ${
          message.role === 'user'
            ? 'rounded-br-none bg-blue-500 text-white'
            : 'rounded-bl-none bg-orange-300 text-black'
        }`}
      >
        <SvelteMarkdown {source} />
      </span>
    </div>
  </div>
</div>
