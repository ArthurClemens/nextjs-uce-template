import { useUceLoader } from "../lib/useUceLoader";

export default function Home() {
  useUceLoader();
  return (
    <>
      Page
      <my-btn />
    </>
  );
}
