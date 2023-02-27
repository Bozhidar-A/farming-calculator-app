<script lang="ts">
  export let textMap,
    sowingRateDataWorking,
    unit,
    wantedProperty;
</script>

<div class="component-input-container">
  <div class="component-var-name">
    {textMap[`SowingRate_${wantedProperty}`]}
  </div>
  <div class="component-var-input">
    <input
      type="number"
      bind:value={sowingRateDataWorking[wantedProperty]}
      on:change={(e) => {
        if (e.target.value === "") {
          sowingRateDataWorking[wantedProperty] = 1;
        }
      }}
    />
  </div>
  <div class="component-var-value">
    {sowingRateDataWorking[wantedProperty]}
    {unit}
  </div>
</div>
