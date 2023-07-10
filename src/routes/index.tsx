import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

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
      content: "Transit arrivals app home npage",
    },
  ],
};
