"use client";
import { action } from "./action";

export default function ClientComponent() {
  return (
    <form action={action}>
      <div role="group">
        <label htmlFor="input-age">Age</label>
        <input type="number" id="input-age" name="age" />
      </div>
      <div role="group">
        <label htmlFor="input-name">Name</label>
        <input type="text" id="input-name" name="name" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
