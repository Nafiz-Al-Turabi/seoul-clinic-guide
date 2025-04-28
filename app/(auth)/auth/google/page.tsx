import { Suspense } from "react";
import GoogleComponent from "./Components/GoogleComponent";

function page() {
  return (
    <Suspense fallback={<p></p>}>
      <GoogleComponent />
    </Suspense>
  );
}

export default page;
