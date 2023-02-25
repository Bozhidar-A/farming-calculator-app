<script>
  import { FormatNumber } from "../Internationalization";

  export let textMap,
    sowingRateDataWorking,
    unit,
    fixedDigitsCount,
    wantedProperty;
</script>

<div class="component-output-container">
  <div class="component-output-var-name ">
    {textMap[`SowingRate_${wantedProperty}`]}
  </div>
  <div class="component-output-var-value">
    {FormatNumber(sowingRateDataWorking[wantedProperty], fixedDigitsCount)}
    {unit}
  </div>
</div>
