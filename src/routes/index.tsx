import { component$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeLoader$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { getSharedSession, useAuthSignin, useAuthSignout } from "~/server/auth";

export const useSessionLoader = routeLoader$(async (event) => {
  return getSharedSession(event);
});

export default component$(() => {
  const signOut = useAuthSignout();
  const signIn = useAuthSignin();

  const session = useSessionLoader();

  return (
    <div>
      <h1>
        Welcome to Qwik <span class="lightning">⚡️</span>
      </h1>
      <Link href="/protected">Protected</Link>

      <div>
        <pre>{JSON.stringify(session.value, null, 2)}</pre>
        <h2>Link method</h2>
        <h2>Client side method</h2>
        {session.value ? (
          <Form action={signOut}>
            <button>Sign Out</button>
          </Form>
        ) : (
          <Form action={signIn}>
            <button>Sign In</button>
          </Form>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
};
