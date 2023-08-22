import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Hello</h1>
      <main>
        <div>
          <Link href="/server-component">Server Component</Link>
        </div>
        <div>
          <Link href="/client-component">Client Component</Link>
        </div>
      </main>
    </>
  );
}
