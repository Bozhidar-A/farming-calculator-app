<script lang="ts">
  export let textMap, sowingRateDataFetched, sowingRateDataWorking, unit, wantedProperty;

  var currClass = "within-safe-range";

  //reactively update the css
  $: if (sowingRateDataWorking[wantedProperty] !== sowingRateDataFetched[wantedProperty].val) {
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
    {textMap[`SowingRate_${wantedProperty}`]}
  </div>
  <div class="component-var-input">
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
    {sowingRateDataWorking[wantedProperty]}
    {unit}
  </div>
</div>
