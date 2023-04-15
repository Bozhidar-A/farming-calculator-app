<script lang="ts">
  export let textMap,
    sowingRateDataWorking,
    sowingRateDataFetched,
    step,
    unit,
    wantedProperty;

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

  function HandleChangeTextInput(e) {
    if (e.target.value === "") {
      sowingRateDataWorking[wantedProperty] = 1;
    }
  }
</script>

<div class="component-input-container">
  <div class="component-var-name">
    <p>
      {textMap[`SowingRate_${wantedProperty}`]}
    </p>
    <p>
      ({sowingRateDataFetched[wantedProperty].minSliderVal}
      {unit} - {sowingRateDataFetched[wantedProperty].maxSliderVal}
      {unit})
    </p>
  </div>

  <div class="component-var-input">
    <input
      class={currClass}
      type="number"
      bind:value={sowingRateDataWorking[wantedProperty]}
      on:change={(e) => {
        HandleChangeTextInput(e);
      }}
    />
    <input
      type="range"
      min={sowingRateDataFetched[wantedProperty].minSliderVal}
      max={sowingRateDataFetched[wantedProperty].maxSliderVal}
      {step}
      bind:value={sowingRateDataWorking[wantedProperty]}
      class={currClass}
    />
  </div>

  <div class="component-var-value">
    {sowingRateDataWorking[wantedProperty]}
    {unit}
  </div>
</div>
