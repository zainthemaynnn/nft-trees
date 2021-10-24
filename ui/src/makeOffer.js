import { E } from '@agoric/eventual-send';
import { AmountMath } from '@agoric/ertp';
import { trees } from "../../api/NFT-gen/trees.js";

export const makeOffer = async ({
  walletP,
  publicFacet,
  cardPurse,
  tokenPurse,
  pricePerCard,
}) => {
  const invitation = E(publicFacet).makeBuyerInvitation();
  const cost = pricePerCard;
  const serial = E(publicFacet).getSerial();

  const offerConfig = {
    // JSONable ID for this offer.  This is scoped to the origin.
    id: Date.now(),
    invitation,
    proposalTemplate: {
      want: {
        NFTs: {
          pursePetname: cardPurse.pursePetname,
          value: E(publicFacet).getSerial(),
        },
      },
      give: {
        Money: {
          pursePetname: tokenPurse.pursePetname,
          value: cost,
        },
      },
    },
  };

  var tree = trees[serial.value];
  alert(`Purchased #${tree.serial}: ${tree.name}, ${tree.location} 1 of ${tree.exclusitivity} ${tree.genus} trees`);

  return E(walletP).addOffer(offerConfig);
};
