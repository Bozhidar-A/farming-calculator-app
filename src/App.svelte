<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";

  // // save and load store from memory
  // import { onMount } from "svelte";
  // // @ts-ignore
  // import { store } from "./lib/Store";

  // let savestore = false;
  // $: if (savestore && $store) {
  //   window.sessionStorage.setItem("store", JSON.stringify($store));
  // }
  // onMount(async () => {
  //   let ses = window.sessionStorage.getItem("store");
  //   if (ses) {
  //     console.log("sob-- ~ loading ses", ses);
  //     $store = JSON.parse(ses);
  //   }
  //   savestore = true;
  // });
</script>

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
  </div>
</Router>
