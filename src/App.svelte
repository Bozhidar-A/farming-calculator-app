<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";

  // save and load store from memory
  import { onMount } from "svelte";
  // @ts-ignore
  import { store } from "./lib/Store";
  import SowingRate from "./routes/SowingRate.svelte";

  let savestore = false;
  $: if (savestore && $store) {
    window.sessionStorage.setItem("store", JSON.stringify($store));
  }
  onMount(async () => {
    let ses = window.sessionStorage.getItem("store");
    if (ses) {
      console.log("sob-- ~ loading ses", ses);
      $store = JSON.parse(ses);
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
