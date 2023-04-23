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

  function HandleButtonClick(value) {
    sowingRateDataWorking[wantedProperty] = value;
  }

  function HandleChangeTextInput(e) {
    if (e.target.value === "") {
      sowingRateDataWorking[wantedProperty] = 1;
    }
  }

  var currClass = "within-safe-range";

  //reactively update the css
  $: if (
    sowingRateDataWorking[wantedProperty] <
      sowingRateDataFetched[wantedProperty].minSliderVal ||
    sowingRateDataWorking[wantedProperty] >
      sowingRateDataFetched[wantedProperty].maxSliderVal
  ) {
    currClass = "outside-safe-range";
  } else {
    currClass = "within-safe-range";
  }

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
            HandleButtonClick(value);
          }}
        >
          {value.toFixed(2)}
        </button>
      {/each}
    </div>
    <input
      type="number"
      step="0.01"
      class={currClass}
      bind:value={sowingRateDataWorking[wantedProperty]}
      on:change={(e) => {
        HandleChangeTextInput(e);
      }}
    />
  </div>
  <div class="component-var-value">
    <p>{sowingRateDataWorking[wantedProperty]}</p>
  </div>
</div>
