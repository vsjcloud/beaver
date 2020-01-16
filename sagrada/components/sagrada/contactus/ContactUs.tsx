import React from "react";

import {BaseLayout} from "../layout/BaseLayout";

export function ContactUs(): React.ReactElement {
  return (
    <BaseLayout>
      <div>
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-center text-blue-1">Liên hệ</h1>
      </div>
      <div className="flex">
        <div className="flex w-1/2">

        </div>
        <div className="flex w-1/2">
          <iframe
            width="600"
            height="450"
            frameBorder="0"
            src="https://www.google.com/maps/embed/v1/place?key=API_KEY&q=Space+Needle,Seattle+WA"
            allowFullScreen={true}
          />
        </div>
      </div>
    </BaseLayout>
  );
}
