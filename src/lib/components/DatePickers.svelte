<script>
	import DatePicker from './DatePicker.svelte';
	let { date_from = $bindable(), date_to = $bindable(), onchange = () => {} } = $props();
</script>

<div class="container">
	<DatePicker {onchange} bind:value={date_from} />
	<DatePicker {onchange} bind:value={date_to} />
</div>
