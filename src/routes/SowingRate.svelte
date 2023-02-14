<script lang="ts">
  import { store } from "../lib/Store";

  // since all the data is local, we can just import it
  import data from "../assets/SowingRateData.json";
  import {
    SowingRate,
    type SowingRateFetchedInterface,
    type SowingRateInterface,
  } from "../lib/classes/SowingRate";
  import Sidebar from "../lib/Sidebar.svelte";

  // the fetched data with bounds and stuff
  let sowingRateDataFetched: SowingRateFetchedInterface = data[0];

  // the working data where all the user input is stored and calculations are made
  // this COULD be put in the store and persistet, but
  // when I use an app and refresh I USUALLY want to start over
  let sowingRateDataWorking: SowingRateInterface = new SowingRate(
    data[0].culture,
    data[0].coefficientSecurity.values[0].valNum,
    data[0].wantedPlantsPerMeterSquard.minSliderVal,
    data[0].massPer1000g.minSliderVal,
    data[0].purity.val,
    data[0].germination.minSliderVal,
    data[0].rowSpacing.minSliderVal
  ); // just shove in the first that on all on init

  // just find all the suuported culture from the json data
  let supportedCultures: string[] = data.map((culture) => culture.culture);
  console.log(supportedCultures);

  function UpdateCultureData(event) {
    sowingRateDataFetched = data.find(
      (culture) => culture.culture == event.target.value
    );
    sowingRateDataWorking.culture = event.target.value;
  }
</script>

<main class="grid-container">
  <div class="side">
    <Sidebar />
  </div>
  <div class="content flex-center-col">
    <div class="component">
      <div class="input-container">
        <div class="culture">
          <p>
            {$store.textMap.SowingRate_culture} - {sowingRateDataWorking.culture}
          </p>
          <select on:change={UpdateCultureData}>
            {#each supportedCultures as culture}
              <option value={culture}>{culture}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
</main>
