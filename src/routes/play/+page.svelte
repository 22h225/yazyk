<script lang="ts">
	export let data;
	import { page } from '$app/stores';
	let t = Number($page.url.searchParams.get('t') ?? 9);

	function getRandomValues<T>(array: T[], n: number): T[] {
		if (n > array.length) {
			throw new Error('n cannot be larger than the array length');
		}

		const result: T[] = [];
		const usedIndices = new Set<number>();

		while (result.length < n) {
			const randomIndex = Math.floor(Math.random() * array.length);

			// すでに選ばれたインデックスはスキップ
			if (!usedIndices.has(randomIndex)) {
				result.push(array[randomIndex]);
				usedIndices.add(randomIndex);
			}
		}

		return result;
	}

	let audio: HTMLAudioElement;
	let playing = true;

	function onClick() {
		if (playing) audio.pause();
		else audio.play();
	}

	function onPlay() {
		playing = true;
	}

	function onStopPlaying() {
		playing = false;
	}

	let count = 0;
	let answers: string[] = [];

	$: is_finished = count == data.records.length;
	$: record = data.records[is_finished ? count - 1 : count];
	$: translations = getRandomValues(
		[record.translation, ...getRandomValues(data.translations, t - 1)],
		t
	);
</script>

{#if is_finished}
	<div class="py-2">
		<div class="p-4 flex flex-col items-center">
			<p>Result</p>
			<p class="text-xl">
				{answers.filter((answer, i) => answer == data.records[i].translation).length}
				/
				{data.records.length}
			</p>
		</div>
		<table class="w-full text text-left rtl:text-right text-gray-500">
			<thead class="text-gray-700 uppercase bg-gray-50">
				<tr class="border">
					<th>Word</th>
					<th>Answer</th>
					<th>Your Answer</th>
				</tr>
			</thead>
			<tbody>
				{#each answers as answer, i}
					<tr
						class="border {answer == data.records[i].translation ? 'bg-green-100' : 'bg-red-100'}"
					>
						<th class="px-1 py-0.5">{data.records[i].word}</th>
						<th class="px-1 py-0.5">{data.records[i].translation}</th>
						<th class="px-1 py-0.5">{answer}</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<div class="border px-6 p-2 bg-gray-100">
		<p>Progress: {count + 1}/{data.records.length}</p>
	</div>
	<div class="px-6 py-2">
		<div class="flex p-2 align-center">
			<p class="text-2xl">{record.word}</p>
			<button
				class="border ml-4 text-white bg-gray-200 font-medium rounded-lg text-sm w-8 h-8"
				type="button"
				on:click={onClick}
			>
				{#if playing}
					<svg class="m-auto h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
						<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
						<path
							d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
						/>
					</svg>
				{:else}
					<svg class="m-auto h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
						<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
						<path
							d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
						/>
					</svg>
				{/if}
			</button>
			<audio
				bind:this={audio}
				on:play={onPlay}
				on:ended={onStopPlaying}
				on:pause={onStopPlaying}
				class="w-64"
				autoplay
				src={`/flac/${record.word}.flac`}
			/>
		</div>
		<div>
			<ul class="list-decimal">
				{#each translations as translation}
					<button
						type="button"
						class="block w-full text-left pl-8 p-1 border"
						on:click={() => {
							count++;
							if (is_finished) return;
							answers.push(translation);
						}}
					>
						<li class="text-lg pl-1">{translation}</li>
					</button>
				{/each}
			</ul>
		</div>
	</div>
{/if}
