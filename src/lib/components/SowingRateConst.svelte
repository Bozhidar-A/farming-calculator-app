<script lang="ts">
  export let textMap,
    sowingRateDataWorking,
    sowingRateDataFetched,
    unit,
    wantedProperty;
</script>

<div class="component-input-container">
  <div class="component-var-name">
    {textMap[`SowingRate_${wantedProperty}`]}
  </div>
  <div class="component-var-input">
    <input type="number" bind:value={sowingRateDataWorking[wantedProperty]} />
  </div>
  <div class="component-var-value">
    {sowingRateDataWorking[wantedProperty]}
    {unit}
  </div>
</div>
