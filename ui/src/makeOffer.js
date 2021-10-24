import { E } from '@agoric/eventual-send';

export const makeOffer = async ({
  walletP,
  publicFacet,
  cardPurse,
  tokenPurse,
  pricePerCard,
}) => {
  const invitation = E(publicFacet).makeBuyerInvitation();
  const cost = pricePerCard;

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

  return E(walletP).addOffer(offerConfig);
};
