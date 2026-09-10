import dynamic from "next/dynamic";

const ReactApp = dynamic(() => import("../src/App"), {
  ssr: false,
});

export default function CatchAllPage() {
  return <ReactApp />;
}
