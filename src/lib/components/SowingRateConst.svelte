<script lang="ts">
  export let textMap,
    sowingRateDataWorking,
    sowingRateDataFetched,
    wantedProperty;
</script>

<p>
  {textMap[`SowingRate_${wantedProperty}`]} - {sowingRateDataWorking[
    wantedProperty
  ]}
</p>
<input type="number" bind:value={sowingRateDataWorking[wantedProperty]} />
