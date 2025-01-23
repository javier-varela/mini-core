<script lang="ts">
	let { value = $bindable(), onchange = function () {} } = $props();
</script>

<input
	class=" rounded-md border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
	{onchange}
	bind:value
	type="date"
/>
