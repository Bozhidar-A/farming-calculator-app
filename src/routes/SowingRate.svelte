<script lang="ts">
  import { store } from "../lib/Store";

  // since all the data is local, we can just import it
  import data from "../assets/SowingRateData.json";
  import { SowingRate } from "../lib/classes/SowingRate";
  import Sidebar from "../lib/components/Sidebar.svelte";
  import { FormatNumber } from "../lib/Internationalization";
  import type SowingRateFetchedInterface from "../lib/interfaces/SowingRateFetchedInterface";
  import type SowingRateInterface from "../lib/interfaces/SowingRateInterface";

  const buttonTypeColors = [
    "#FFE699",
    "#FFC000",
    "#92D050",
    "#92D050",
    "#00B050",
  ];

  // the fetched data with bounds and stuff
  let sowingRateDataFetched: SowingRateFetchedInterface = data[0];

  // the working data where all the user input is stored and calculations are made
  // this COULD be put in the store and persist, but
  // when I use an app and refresh I USUALLY want to start over
  let sowingRateDataWorking: SowingRateInterface = new SowingRate(
    data[0].culture.id,
    data[0].coefficientSecurity.values[0],
    data[0].wantedPlantsPerMeterSquard.minSliderVal,
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
              {#each sowingRateDataFetched.coefficientSecurity.values as value, i}
                <button
                  class="multi-option-button"
                  style="background-color: {buttonTypeColors[i]}"
                  on:click={() => {
                    sowingRateDataWorking.coefficientSecurity = value;
                  }}
                >
                  {value}
                </button>
              {/each}
            </div>
            <input
              type="number"
              bind:value={sowingRateDataWorking.coefficientSecurity}
            />
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
              min={sowingRateDataFetched.wantedPlantsPerMeterSquard
                .minSliderVal}
              max={sowingRateDataFetched.wantedPlantsPerMeterSquard
                .maxSliderVal}
              step={1}
              bind:value={sowingRateDataWorking.wantedPlantsPerMeterSquard}
            />
            <input
              type="number"
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
            <input
              type="number"
              bind:value={sowingRateDataWorking.massPer1000g}
            />
          </div>
        </div>

        <div class="input-container">
          <div class="purity">
            <p>
              {$store.textMap.SowingRate_purity} - {sowingRateDataWorking.purity}
            </p>
            <input type="number" bind:value={sowingRateDataWorking.purity} />
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
            <input
              type="number"
              bind:value={sowingRateDataWorking.germination}
            />
          </div>
        </div>

        <div class="input-container">
          <div class="row-spacing">
            <p>
              {$store.textMap.SowingRate_rowSpacing} -
              {sowingRateDataWorking.rowSpacingCm}
            </p>
            <input
              type="range"
              min={sowingRateDataFetched.rowSpacingCm.minSliderVal}
              max={sowingRateDataFetched.rowSpacingCm.maxSliderVal}
              step={1}
              bind:value={sowingRateDataWorking.rowSpacingCm}
            />
            <input
              type="number"
              bind:value={sowingRateDataWorking.rowSpacingCm}
            />
          </div>
        </div>
      </div>
      <button
        on:click={() => {
          sowingRateDataWorking.wantedPlantsPerMeterSquard = 28;
          sowingRateDataWorking.massPer1000g = 200;
          sowingRateDataWorking.germination = 92;
          sowingRateDataWorking.rowSpacingCm = 70;
        }}>force known result test vals</button
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
