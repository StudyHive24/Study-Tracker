"use client";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

function GTMInitialiser() {
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: "GTM-5R5JQ2PL",
    };

    TagManager.initialize(tagManagerArgs);
  }, []);
  return null;
}

export default GTMInitialiser;