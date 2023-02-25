<script lang="ts">
  import { store } from "../lib/Store";

  // since all the data is local, we can just import it
  import data from "../assets/SowingRateData.json";
  import { SowingRate } from "../lib/classes/SowingRate";
  import Sidebar from "../lib/components/Sidebar.svelte";
  import { FormatNumber } from "../lib/Internationalization";
  import type SowingRateFetchedInterface from "../lib/interfaces/SowingRateFetchedInterface";
  import type SowingRateInterface from "../lib/interfaces/SowingRateInterface";
  import SowingRateButtons from "../lib/components/SowingRateButtons.svelte";
  import SowingRateSlider from "../lib/components/SowingRateSlider.svelte";
  import SowingRateConst from "../lib/components/SowingRateConst.svelte";

  // the fetched data with bounds and stuff
  let sowingRateDataFetched: SowingRateFetchedInterface = data[0];

  // the working data where all the user input is stored and calculations are made
  // this COULD be put in the store and persist, but
  // when I use an app and refresh I USUALLY want to start over
  let sowingRateDataWorking: SowingRateInterface = new SowingRate(
    data[0].culture.id,
    data[0].coefficientSecurity.values[0],
    data[0].wantedPlantsPerMeterSquared.minSliderVal,
    data[0].massPer1000g.minSliderVal,
    data[0].purity.val,
    data[0].germination.minSliderVal,
    data[0].rowSpacingCm.minSliderVal
  ); // just shove in the first that on all on init

  // just find all the suuported culture from the json data
  let supportedCultures: string[] = data.map((entry) => entry.culture.id);

  function UpdateCultureData(event) {
    sowingRateDataFetched = data.find(
      (entry) => entry.culture.id == event.target.value
    );
    sowingRateDataWorking.culture = event.target.value;
  }

  function CalculateEndResults() {
    sowingRateDataWorking.CalculateEndResults();

    // force update UI
    sowingRateDataWorking = sowingRateDataWorking;
    // I can kinda understand, but why?
    // I have the outputs as dependancies, so the UI should update
  }
</script>

<main class="grid-container">
  <div class="side">
    <Sidebar />
  </div>
  <div class="content flex-center-col">
    <div class="component">
      <div class="inputs">
        <div class="input-container">
          <div class="culture">
            <p>
              {$store.textMap.SowingRate_culture} -
              <b>{$store.textMap[`culture_${sowingRateDataWorking.culture}`]}</b
              >
              (<i>{sowingRateDataFetched.culture.latin}</i>)
            </p>
            <select on:change={UpdateCultureData} class="stretchy">
              {#each supportedCultures as culture}
                <option value={culture}>{culture}</option>
              {/each}
            </select>
          </div>
        </div>

        <SowingRateButtons
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          bind:sowingRateDataFetched
          wantedProperty="coefficientSecurity"
        />

        <SowingRateSlider
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          bind:sowingRateDataFetched
          step={1}
          wantedProperty="wantedPlantsPerMeterSquared"
        />

        <SowingRateSlider
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          bind:sowingRateDataFetched
          step={0.1}
          wantedProperty="massPer1000g"
        />

        <SowingRateConst
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          bind:sowingRateDataFetched
          wantedProperty="purity"
        />

        <SowingRateSlider
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          bind:sowingRateDataFetched
          step={1}
          wantedProperty="germination"
        />

        <SowingRateSlider
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          bind:sowingRateDataFetched
          step={1}
          wantedProperty="rowSpacingCm"
        />
      </div>
      <button
        on:click={() => {
          sowingRateDataWorking.wantedPlantsPerMeterSquared = 28;
          sowingRateDataWorking.massPer1000g = 200;
          sowingRateDataWorking.germination = 92;
          sowingRateDataWorking.rowSpacingCm = 70;
        }}>force known result test vals</button
      >
      <button on:click={() => console.log(sowingRateDataWorking)}
        >debug print</button
      >
      <hr />

      <div class="outputs">
        <button on:click={CalculateEndResults}>~~~ = ~~~</button>
        <div class="output-container">
          <p>
            {$store.textMap.SowingRate_safeSeedsPerMeterSquared} - {FormatNumber(
              sowingRateDataWorking.sowingRateSafeSeedsPerMeterSquared,
              0
            )}
          </p>
        </div>

        <div class="output-container">
          <p>
            {$store.textMap.SowingRate_plantsDa} - {FormatNumber(
              sowingRateDataWorking.sowingRatePlantsPerDecare,
              0
            )}
          </p>
        </div>

        <div class="output-container">
          <p>
            {$store.textMap.SowingRate_usedSeedsKgPerDa} - {FormatNumber(
              sowingRateDataWorking.usedSeedsKgPerDecare,
              1
            )}
          </p>
        </div>

        <div class="output-container">
          <p>
            {$store.textMap.SowingRate_internalRowHeightCm} - {FormatNumber(
              sowingRateDataWorking.internalRowHeightCm,
              1
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
