import React, { useEffect } from "react";
import InfoSection from "../../compoents/InfoSection/InfoSection";
import { homeObjOne1, homeObjOne2 } from "../Data";

const PRODUCT_IDS = [
  "101", "102", "103", "104", "105", "106", "107", "108", "109", "110",
  "201", "202", "203", "204", "205", "206", "207", "208", "209", "210"
];

function Products() {
  useEffect(() => {
    const randomProductId = PRODUCT_IDS[Math.floor(Math.random() * PRODUCT_IDS.length)];

    const trySendProductView = (retries = 10) => {
      if (window.alloy) {
        window.alloy("sendEvent", {
          decisionScopes: ["recs_mbox"],
          renderDecisions: false,
          data: {
            __adobe: {
              target: {
                "entity.id": randomProductId
              }
            }
          }
        }).then(function (result) {
          console.log("Target response:", result);
          console.log("Propositions:", result.propositions || []);
        }).catch(function (error) {
          console.error("Target mbox request failed:", error);
        });
      } else if (retries > 0) {
        setTimeout(() => trySendProductView(retries - 1), 200);
      }
    };

    trySendProductView();
  }, []);

  return (
    <>
      <InfoSection {...homeObjOne1} />
      <InfoSection {...homeObjOne2} />
    </>
  );
}

export default Products;