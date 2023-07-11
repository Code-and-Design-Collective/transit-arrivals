import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import axios from "axios";

import type { DocumentHead } from "@builder.io/qwik-city";
import type {
  ArrivalsResponse,
  ArrivalsResultSet,
} from "~/interfaces/Arrivals";

const apiBaseUrl = import.meta.env.VITE_TRIMET_API_URL;
const appId = import.meta.env.VITE_TRIMET_APP_ID;

const fetchArrivals = server$(async () => {
  const query = `${apiBaseUrl}/arrivals?locIDs=10764,&appID=${appId}`;
  const { data } = await axios.get<ArrivalsResponse>(query);

  return data.resultSet;
});

export default component$(() => {
  const arrivals = useSignal<ArrivalsResultSet | null>(null);

  useTask$(async () => {
    arrivals.value = await fetchArrivals();
  });

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
