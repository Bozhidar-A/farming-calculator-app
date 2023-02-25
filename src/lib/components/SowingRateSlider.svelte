<script lang="ts">
  export let textMap,
    sowingRateDataWorking,
    sowingRateDataFetched,
    step,
    unit,
    wantedProperty;
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
    <input type="number" bind:value={sowingRateDataWorking[wantedProperty]} />
    <input
      type="range"
      min={sowingRateDataFetched[wantedProperty].minSliderVal}
      max={sowingRateDataFetched[wantedProperty].maxSliderVal}
      {step}
      bind:value={sowingRateDataWorking[wantedProperty]}
      class="max-width"
    />
  </div>

  <div class="component-var-value">
    {sowingRateDataWorking[wantedProperty]}
    {unit}
  </div>
</div>
