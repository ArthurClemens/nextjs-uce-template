import { useUceLoader } from "../lib/useUceLoader";

export default function Home() {
  useUceLoader();
  return <button is="my-btn" />;
}
