import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from '@builder.io/qwik';
import axios from 'axios';

import { getArrivalTimeMinutes } from '~/utils/date';

import type { DocumentHead } from '@builder.io/qwik-city';
import type { StopArrivals } from '~/interfaces/Arrivals';

const apiBaseUrl = import.meta.env.VITE_TRIMET_API_URL;
const appId = import.meta.env.VITE_TRIMET_APP_ID;

export default component$(() => {
  const stopID = useSignal('10764');

  const arrivalsResource = useResource$<StopArrivals>(async ({ track }) => {
    track(() => stopID.value);

    try {
      const query = `${apiBaseUrl}/arrivals?locIDs=${stopID.value},&appID=${appId}`;
      const { data } = await axios.get(query);

      return data.resultSet;
    } catch (error) {
      console.error('Error occurred while fetching arrivals:', error);
      throw error;
    }
  });

  return (
    <>
      <div id='homepage' class='w-full'>
        <div class='flex justify-center w-full'>
          <Resource
            value={arrivalsResource}
            onResolved={(arrivals) => {
              return (
                <div class='flex flex-col gap-y-[1.5rem] w-full justify-center'>
                  <div class='title flex justify-between text-[2rem] px-[2rem]'>
                    <h2>{arrivals.location[0]?.desc}</h2>
                    <div class='stop'>STOP #{stopID.value}</div>
                  </div>
                  <ul class='flex flex-col justify-center items-center w-full'>
                    {arrivals.arrival.map((item, index) => (
                      <li
                        key={index}
                        style={{ backgroundColor: `#${item.routeColor}` }}
                        class='w-full flex justify-between py-[2rem] text-[3rem] px-[2rem]'
                      >
                        <div class='title'>{item.shortSign}</div>
                        <div class='time'>
                          {getArrivalTimeMinutes(
                            item.estimated,
                            arrivals.queryTime
                          )}{' '}
                          Min
                        </div>
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
  title: 'Transit Arrivals',
  meta: [
    {
      name: 'description',
      content: 'Transit arrivals app home page',
    },
  ],
};
