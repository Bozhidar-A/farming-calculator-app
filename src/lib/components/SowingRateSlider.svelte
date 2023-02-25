<script lang="ts">
  export let textMap,
    sowingRateDataWorking,
    sowingRateDataFetched,
    step,
    wantedProperty;
</script>

<p>
  {textMap[`SowingRate_${wantedProperty}`]} -
  {sowingRateDataWorking[wantedProperty]}
</p>
<input
  type="range"
  min={sowingRateDataFetched[wantedProperty].minSliderVal}
  max={sowingRateDataFetched[wantedProperty].maxSliderVal}
  {step}
  bind:value={sowingRateDataWorking[wantedProperty]}
/>
<input type="number" bind:value={sowingRateDataWorking[wantedProperty]} />
