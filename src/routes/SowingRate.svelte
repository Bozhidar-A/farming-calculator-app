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

      <div class="input-container">
        <div class="coefficient-security">
          <p>
            {$store.textMap.SowingRate_coefficientSecurity} -
            {sowingRateDataWorking.coefficientSecurity}
          </p>
          <div class="coefficient-security-buttons">
            {#each sowingRateDataFetched.coefficientSecurity.values as value}
              <button
                class="multi-option-button"
                style="background-color: {value.color}"
                on:click={() => {
                  sowingRateDataWorking.coefficientSecurity = value.valNum;
                }}
              >
                {value.valNum}
              </button>
            {/each}
          </div>
          <input bind:value={sowingRateDataWorking.coefficientSecurity} />
        </div>
      </div>

      <div class="input-container">
        <div class="wanted-plants-per-meter-squard">
          <p>
            {$store.textMap.SowingRate_wantedPlantsPerMeterSquared} -
            {sowingRateDataWorking.wantedPlantsPerMeterSquard}
          </p>
          <input
            type="range"
            min={sowingRateDataFetched.wantedPlantsPerMeterSquard.minSliderVal}
            max={sowingRateDataFetched.wantedPlantsPerMeterSquard.maxSliderVal}
            step={1}
            bind:value={sowingRateDataWorking.wantedPlantsPerMeterSquard}
          />
          <input
            bind:value={sowingRateDataWorking.wantedPlantsPerMeterSquard}
          />
        </div>
      </div>

      <div class="input-container">
        <div class="mass-per-1000g">
          <p>
            {$store.textMap.SowingRate_massPer1000g} -
            {sowingRateDataWorking.massPer1000g}
          </p>
          <input
            type="range"
            min={sowingRateDataFetched.massPer1000g.minSliderVal}
            max={sowingRateDataFetched.massPer1000g.maxSliderVal}
            step={0.1}
            bind:value={sowingRateDataWorking.massPer1000g}
          />
          <input bind:value={sowingRateDataWorking.massPer1000g} />
        </div>
      </div>

      <div class="input-container">
        <div class="purity">
          <p>
            {$store.textMap.SowingRate_purity} - {sowingRateDataWorking.purity}
          </p>
          <input bind:value={sowingRateDataWorking.purity} />
        </div>
      </div>

      <div class="input-container">
        <div class="germination">
          <p>
            {$store.textMap.SowingRate_germination} -
            {sowingRateDataWorking.germination}
          </p>
          <input
            type="range"
            min={sowingRateDataFetched.germination.minSliderVal}
            max={sowingRateDataFetched.germination.maxSliderVal}
            step={0.1}
            bind:value={sowingRateDataWorking.germination}
          />
          <input bind:value={sowingRateDataWorking.germination} />
        </div>
      </div>

      <div class="input-container">
        <div class="row-spacing">
          <p>
            {$store.textMap.SowingRate_rowSpacing} -
            {sowingRateDataWorking.rowSpacing}
          </p>
          <input
            type="range"
            min={sowingRateDataFetched.rowSpacing.minSliderVal}
            max={sowingRateDataFetched.rowSpacing.maxSliderVal}
            step={1}
            bind:value={sowingRateDataWorking.rowSpacing}
          />
          <input bind:value={sowingRateDataWorking.rowSpacing} />
        </div>
      </div>
    </div>
  </div>
</main>
