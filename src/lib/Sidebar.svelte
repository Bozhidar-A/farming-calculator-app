<script>
  import { Link } from "svelte-navigator";
  import { UpdateActiveLangMap } from "./Internationalization";
  import { store } from "./Store";
  const supportedLangs = {
    EN: "🇬🇧",
    BG: "🇧🇬",
  };

  function LangSelectHandler(event) {
    UpdateActiveLangMap(event.target.value);
  }
</script>

<div class="side-settings">
  <select on:change={LangSelectHandler}>
    <!-- <option value="EN">🇬🇧</option>
    <option value="BG">🇧🇬</option> -->
    {#each Object.keys(supportedLangs) as lang}
      {#if $store.activeLang === lang}
        <option value={lang} selected>{supportedLangs[lang]}</option>
      {:else}
        <option value={lang}>{supportedLangs[lang]}</option>
      {/if}
    {/each}
  </select>
</div>

<div class="side-btns flex-center-col">
  <Link to="/"><h2 class="side-btn">{$store.textMap.Sidebar_home}</h2></Link>
  <Link to="/sowingrate"
    ><h2 class="side-btn">{$store.textMap.Sidebar_sowingRate}</h2></Link
  >
  <h2 class="side-btn">{$store.textMap.Sidebar_moreComingSoon}</h2>
</div>
