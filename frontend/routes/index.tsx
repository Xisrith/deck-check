/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";

interface DeckResponse {
  success: boolean;
  data: {
    id: string;
    format: string;
    cards: string[];
  }[];
}

export const handler: Handlers<DeckResponse> = {
  async GET(_, ctx) {
    const response = await fetch("http://localhost:8080/decks");
    const decks = await response.json();
    return ctx.render(decks);
  }
}

export default function Home({ data }: PageProps<DeckResponse>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter start={3} />
      <p>Decks Loaded:</p>
      {data.data.map(d =>
        <ul class={tw`px-4`}>
          <li>{d.id} ({d.format})</li>
          <ul class={tw`px-4`}>
            {d.cards.map(c => <li>{c}</li>)}
          </ul>
        </ul>
      )}
    </div>
  );
}
