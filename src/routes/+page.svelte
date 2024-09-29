<script lang="ts">
	let c: string;
	let t: string;

	function onSubmit() {
		window.location.href = `/play?c=${c}&t=${t}`;
	}
</script>

<form class="px-6 p-2" action="" method="get" on:submit={onSubmit}>
	<div class="p-2">
		<div class="pr-4 py-2">
			<label for="count">Question count: </label>
			<select name="count" id="count" bind:value={c}>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
		</div>
		<div class="pr-4 py-2">
			<label for="count">Translation count: </label>
			<select name="count" id="count" bind:value={t}>
				<option value="1" selected>1</option>
				<option value="2" selected>2</option>
				<option value="3" selected>3</option>
				<option value="4" selected>4</option>
				<option value="5" selected>5</option>
				<option value="6" selected>6</option>
				<option value="7" selected>7</option>
				<option value="8" selected>8</option>
				<option value="9" selected>9</option>
			</select>
		</div>
	</div>
	<input
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		type="submit"
		value="Submit"
	/>
</form>
