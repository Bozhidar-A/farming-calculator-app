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

<div class="component-input-container">
  <div class="component-var-name">
    <p>{textMap[`SowingRate_${wantedProperty}`]}</p>
    <p>
      ({Math.min(...sowingRateDataFetched[wantedProperty].values)}-{Math.max(
        ...sowingRateDataFetched[wantedProperty].values
      )})
    </p>
  </div>
  <div class="component-var-input">
    <div>
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
  </div>
  <div class="component-var-value">
    <p>{sowingRateDataWorking[wantedProperty]}</p>
  </div>
</div>
