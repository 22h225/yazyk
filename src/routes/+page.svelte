<script lang="ts">
	let c: string;
	let t: string;
	let l: string;
	let language: string;

	function onSubmit() {
		window.location.href = `/${language}?c=${c}&t=${t}&l=${l}`;
	}
</script>

<form class="px-6 p-2" action="" method="get" on:submit={onSubmit}>
	<div class="p-2">
		<div class="pr-4 py-2">
			<label for="count">Question amount: </label>
			<select name="count" id="count" bind:value={c}>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
		</div>
		<div class="pr-4 py-2">
			<label for="count">Translation amount: </label>
			<select name="count" id="count" bind:value={t}>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4" selected>4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
			</select>
		</div>
		<div class="pr-4 py-2">
			<label for="count">Language: </label>
			<select name="count" id="count" bind:value={language}>
				<option value="russian">Russian</option>
				<option value="arabic">Arabic</option>
				<option value="chinese">Chinese</option>
				<option value="dutch">Dutch</option>
				<option value="german">German</option>
				<option value="italian">Italian</option>
				<option value="play">Russian Previous Version</option>
			</select>
		</div>
		<div class="pr-4 py-2">
			<label for="count">Translation Language: </label>
			<select name="count" id="count" bind:value={l}>
				<option value="jp">Japanese</option>
				<option value="en">English</option>
			</select>
		</div>
	</div>
	<input
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		type="submit"
		value="Submit"
	/>
</form>
