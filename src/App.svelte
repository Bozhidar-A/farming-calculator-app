<script>
  import { Router, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";

  // save and load store from memory
  import { onMount } from "svelte";
  // @ts-ignore
  import { store } from "./lib/Store";
  import SowingRate from "./routes/SowingRate.svelte";
  import { UpdateActiveLangMap } from "./lib/Internationalization";

  let savestore = false;
  $: if (savestore && $store) {
    window.sessionStorage.setItem("setLang", $store.activeLang);
  }
  onMount(async () => {
    let prevSetLang = window.sessionStorage.getItem("setLang");
    if (prevSetLang) {
      console.log("Loading wanted user lang: ", prevSetLang);
      UpdateActiveLangMap(prevSetLang);
    }
    savestore = true;
  });
</script>

<svelte:head>
  <title>Farming Calculator App</title>
</svelte:head>

<Router>
  <!-- <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="blog">Blog</Link>
  </nav> -->
  <div>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/sowingrate">
      <SowingRate />
    </Route>
  </div>
</Router>
