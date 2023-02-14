<script>
  //   // @ts-nocheck

  import { UpdateActiveLangMap } from "./Internationalization";
  import { store } from "./Store";

  function LangSelectHandler(event) {
    UpdateActiveLangMap(event.target.value);
  }
</script>

<div class="side-lang">
  <select on:change={LangSelectHandler}>
    <option value="EN">🇬🇧</option>
    <option value="BG">🇧🇬</option>
  </select>
</div>

<div class="side-btns flex-center-col">
  <h2 class="side-btn">{$store.textMap.Sidebar_home}</h2>
  <h2 class="side-btn">{$store.textMap.Sidebar_sowingRate}</h2>
  <h2 class="side-btn">{$store.textMap.Sidebar_moreComingSoon}</h2>
</div>
