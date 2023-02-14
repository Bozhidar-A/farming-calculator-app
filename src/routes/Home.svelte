<script lang="ts">
  import Sidebar from "../lib/Sidebar.svelte";
  import { store } from "../lib/Store";
</script>

<main class="grid-container">
  <div class="side">
    <Sidebar />
  </div>
  <div class="content flex-center-col">
    <h1>{$store.textMap.Home_welcomeText}</h1>
    <h2 class="home-desktop-sub">
      {$store.textMap.Home_subWelcomeTextDesktop}
    </h2>
    <h2 class="home-mobile-sub">{$store.textMap.Home_subWelcomeTextMobile}</h2>
  </div>
</main>
