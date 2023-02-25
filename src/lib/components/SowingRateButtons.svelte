<script>
  export let textMap,
    sowingRateDataWorking,
    sowingRateDataFetched,
    wantedProperty;

  const buttonTypeColors = [
    "#FFE699",
    "#FFC000",
    "#92D050",
    "#92D050",
    "#00B050",
  ];
</script>

<p>
  {textMap[`SowingRate_${wantedProperty}`]} -
  {sowingRateDataWorking[wantedProperty]}
</p>
<div class="coefficient-security-buttons">
  {#each sowingRateDataFetched[wantedProperty].values as value, i}
    <button
      class="multi-option-button"
      style="background-color: {buttonTypeColors[i]}"
      on:click={() => {
        sowingRateDataWorking[wantedProperty] = value;
      }}
    >
      {value}
    </button>
  {/each}
</div>
<input type="number" bind:value={sowingRateDataWorking[wantedProperty]} />
