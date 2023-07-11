import { component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_TRIMET_API_URL;
const appId = import.meta.env.VITE_TRIMET_APP_ID;

const fetchArrivals = server$(async () => {
  const query = `${apiBaseUrl}/arrivals?locIDs=6849,6850&appID=${appId}`;
  const data = await axios.get(query);
  console.log(data)
  return data;
});

fetchArrivals();
export default component$(() => {
  return (
    <>
      <div id="homepage">
        <div class="flex justify-center">
          <div class="intro">Home Page</div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Transit Arrivals",
  meta: [
    {
      name: "description",
      content: "Transit arrivals app home page",
    },
  ],
};
