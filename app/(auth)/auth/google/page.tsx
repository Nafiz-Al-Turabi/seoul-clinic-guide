import { Suspense } from "react";
import GoogleComponent from "./Components/GoogleComponent";

function page() {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <GoogleComponent />
    </Suspense>
  );
}

export default page;
