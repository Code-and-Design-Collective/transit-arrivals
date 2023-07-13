import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import axios from "axios";

import { getArrivalTimeMinutes } from "~/utils/date";

import type { DocumentHead } from "@builder.io/qwik-city";
import type { StopArrivals } from "~/interfaces/Arrivals";

const apiBaseUrl = import.meta.env.VITE_TRIMET_API_URL;
const appId = import.meta.env.VITE_TRIMET_APP_ID;

export default component$(() => {
  const stopID = useSignal("10764");

  const getBgColor = (hex: string): string => {
    return `bg-[#${hex}]`;
  };

  const arrivalsResource = useResource$<StopArrivals>(async ({ track }) => {
    track(() => stopID.value);

    try {
      const query = `${apiBaseUrl}/arrivals?locIDs=${stopID.value},&appID=${appId}`;
      const { data } = await axios.get(query);
      // TODO move to util function

      console.log(
        getArrivalTimeMinutes(
          data.resultSet?.arrival[0]?.estimated,
          data.resultSet?.queryTime
        )
      );
      console.log(data.resultSet);
      return data.resultSet;
    } catch (error) {
      console.error("Error occurred while fetching arrivals:", error);
      throw error;
    }
  });

  return (
    <>
      <div id="homepage">
        <div class="flex justify-center">
          <Resource
            value={arrivalsResource}
            onResolved={(arrivals) => {
              return (
                <div class="flex flex-col gap-y-[1.5rem]">
                  <h2>{arrivals.location[0]?.desc}</h2>
                  <ul class="flex flex-col gap-y-[1rem] justify-center items-center text-center">
                    {arrivals.arrival.map((item, index) => (
                      <li
                        key={index}
                        class={[
                          getBgColor(item.routeColor),
                        ]}
                      >
                        {getArrivalTimeMinutes(
                          item.estimated,
                          arrivals.queryTime
                        )}{" "}
                        Min
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }}
          />
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
