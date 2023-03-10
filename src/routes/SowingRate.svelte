<script lang="ts">
  import { store } from "../lib/Store";

  // since all the data is local, we can just import it
  // import data from "../../public/assets/SowingRateData.json";
  import data from "../assets/SowingRateData.json"
  import { SowingRate } from "../lib/classes/SowingRate";
  import Sidebar from "../lib/components/Sidebar.svelte";
  import type SowingRateFetchedInterface from "../lib/interfaces/SowingRateFetchedInterface";
  import type SowingRateInterface from "../lib/interfaces/SowingRateInterface";
  import SowingRateButtons from "../lib/components/SowingRateButtons.svelte";
  import SowingRateSlider from "../lib/components/SowingRateSlider.svelte";
  import SowingRateConst from "../lib/components/SowingRateConst.svelte";
  import SowingRateOutput from "../lib/components/SowingRateOutput.svelte";

  // the fetched data with bounds and stuff
  let sowingRateDataFetched: SowingRateFetchedInterface = data[0];

  // the working data where all the user input is stored and calculations are made
  // this COULD be put in the store and persist, but
  // when I use an app and refresh I USUALLY want to start over
  let sowingRateDataWorking: SowingRateInterface = new SowingRate(
    "",0,0,0,0,0,0,
  ); // js does not support multiple constructors, so we have to do this

  // dynamically fill the working data with the first fetched data
  sowingRateDataWorking.FillWithData(data[0]);

  // just find all the supported culture from the json data
  let supportedCultures: {}[] = data.map((entry) => entry.culture);
  console.log(supportedCultures)

  function UpdateCultureData(event) {
    let newCult = data.find((entry) => entry.culture.id == event.target.value);
    sowingRateDataFetched = newCult;
    sowingRateDataFetched = data.find(
      (entry) => entry.culture.id == event.target.value
    );
    sowingRateDataWorking.culture = event.target.value;

    Object.keys(sowingRateDataFetched).forEach((pro) => {
      if (sowingRateDataFetched[pro].type === "buttons") {
        sowingRateDataWorking[pro] = sowingRateDataFetched[pro].values[0];
      } else if (sowingRateDataFetched[pro].type === "slider") {
        sowingRateDataWorking[pro] = sowingRateDataFetched[pro].minSliderVal;
      } else if (sowingRateDataFetched[pro].type === "const") {
        sowingRateDataWorking[pro] = sowingRateDataFetched[pro].val;
      }
    })
  }

  function CalculateEndResults() {
    sowingRateDataWorking.CalculateEndResults();

    // force update UI
    sowingRateDataWorking = sowingRateDataWorking;
    // I can kinda understand, but why?
    // I have the outputs as dependancies, so the UI should update
  }

  function FetchCultureTextMapID(culture:string){
    return supportedCultures.find((cul) => cul.id === culture);
  }
</script>

<main class="grid-container">
  <div class="side">
    <Sidebar />
  </div>
  <div class="content flex-center-col">
    <div class="component">
      <div class="inputs">
        
        {#each Object.keys(sowingRateDataFetched) as cultureProperty}
          {#if cultureProperty === "culture"}
            <div class="input-container">
              <div class="culture">
                <p>
                  {$store.textMap.SowingRate_culture} -
                  <b>{$store.textMap[`culture_${FetchCultureTextMapID(sowingRateDataWorking.culture).textMapID}`]}</b>
                  (<i>{FetchCultureTextMapID(sowingRateDataWorking.culture).latin}</i>)
                </p>
                <select on:change={UpdateCultureData} class="full-width">
                  {#each supportedCultures as cultureData}
                    <option value={cultureData["id"]}>{$store.textMap[`culture_${cultureData["textMapID"]}`]} - {cultureData["latin"]}</option>
                  {/each}
                </select>
              </div>
          </div>
          {/if}

          {#if sowingRateDataFetched[cultureProperty].type === "buttons"}
            <SowingRateButtons
              bind:textMap={$store.textMap}
              bind:sowingRateDataWorking
              bind:sowingRateDataFetched
              wantedProperty={cultureProperty}
            />
          {/if}

          {#if sowingRateDataFetched[cultureProperty].type === "slider"}
            <SowingRateSlider
              bind:textMap={$store.textMap}
              bind:sowingRateDataWorking
              bind:sowingRateDataFetched
              step={sowingRateDataFetched[cultureProperty].step}
              unit={sowingRateDataFetched[cultureProperty].unit}
              wantedProperty={cultureProperty}
            />
          {/if}

          {#if sowingRateDataFetched[cultureProperty].type === "const"}
            <SowingRateConst
              bind:textMap={$store.textMap}
              bind:sowingRateDataWorking
              unit={sowingRateDataFetched[cultureProperty].unit}
              wantedProperty={cultureProperty}
            />
          {/if}
        {/each}
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
        <button on:click={CalculateEndResults} class="full-width large-text spacing">~~~ = ~~~</button>

        <SowingRateOutput
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          unit="plants/m²"
          fixedDigitsCount="0"
          wantedProperty="sowingRateSafeSeedsPerMeterSquared"
        />

        <SowingRateOutput
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          unit="sowing rate/da"
          fixedDigitsCount="0"
          wantedProperty="sowingRatePlantsPerDecare"
        />

        <SowingRateOutput
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          unit="kg/da"
          fixedDigitsCount="1"
          wantedProperty="usedSeedsKgPerDecare"
        />

        <SowingRateOutput
          bind:textMap={$store.textMap}
          bind:sowingRateDataWorking
          unit="cm"
          fixedDigitsCount="1"
          wantedProperty="internalRowHeightCm"
        />
      </div>
    </div>
  </div>
</main>
