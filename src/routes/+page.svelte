<script lang="ts">
	import type { PageData } from './$types';
	import DatePickers from '$lib/components/DatePickers.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount, tick } from 'svelte';

	let { data }: { data: PageData } = $props();
	let loading: boolean = $state(false);

	$inspect(data.gastos);

	// Clase DateParams mejorada
	class DateParams {
		#date_from: string = $state('');
		#date_to: string = $state('');

		constructor(date_from: string, date_to: string) {
			this.#date_from = date_from;
			this.#date_to = date_to;
		}

		get date_from(): string {
			return this.#date_from;
		}

		set date_from(value: string) {
			if (new Date(value) > new Date(this.#date_to)) {
				this.#date_to = value;
			}
			this.#date_from = value;
			this.updateParams();
		}

		get date_to(): string {
			return this.#date_to;
		}

		set date_to(value: string) {
			if (new Date(value) < new Date(this.#date_from)) {
				this.#date_from = value;
			}
			this.#date_to = value;
			this.updateParams();
		}

		// Actualizar parámetros en la URL
		updateParams() {
			loading = true;
			const params = new URLSearchParams(page.url.search);
			params.set('date_from', this.#date_from);
			params.set('date_to', this.#date_to);
			goto(`${page.url.pathname}?${params.toString()}`).then(() => (loading = false));
		}
	}

	const dateParams = new DateParams(data.date_from, data.date_to);

	onMount(() => {
		loading = false;
	});
</script>

<div class="container mx-auto flex flex-col gap-3">
	{#if loading}
		<span class="loading loading-spinner loading-md"></span>
	{:else}
		<DatePickers bind:date_from={dateParams.date_from} bind:date_to={dateParams.date_to} />

		<table class="table">
			<thead>
				<tr>
					<th>Id</th>
					<th>Fecha</th>
					<th>Monto</th>
					<th>Descripción</th>
					<th>Empleado</th>
					<th>Departamento</th>
				</tr>
			</thead>
			<tbody>
				{#each data.gastos as gasto}
					<tr>
						<td>{gasto.id}</td>
						<td>{gasto.created_at}</td>
						<td>{gasto.monto}</td>
						<td>{gasto.descripcion}</td>
						<td>{gasto.empleados.nombre + ' ' + gasto.empleados.apellido}</td>
						<td>{gasto.departamentos.nombre}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
