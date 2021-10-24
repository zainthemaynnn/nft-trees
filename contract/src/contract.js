// @ts-check
import '@agoric/zoe/exported';

import { makeIssuerKit, AssetKind, AmountMath } from '@agoric/ertp';
import { Far } from '@agoric/marshal';
/**
 * This contract mints non-fungible tokens (baseball cards) and creates a contract
 * instance to sell the cards in exchange for some sort of money.
 *
 * @type {ContractStartFn}
 */
const start = async (zcf) => {
  const { pricePerNFT, nftName } = zcf.getTerms();
  const mint = await zcf.makeZCFMint(nftName, AssetKind.SET);
  const { brand: brand } = mint.getIssuerRecord();

  var serial = AmountMath.make(brand, [0n]);
  const one = AmountMath.make(brand, [1n]);
  const { zcfSeat: sellerSeat } = zcf.makeEmptySeatKit();

  const buyNFTs = (buyerSeat) => {
    const amount = AmountMath.add(serial, one);
    mint.mintGains({ NFTs: amount }, buyerSeat);
    serial += 1n;

    sellerSeat.incrementBy(buyerSeat.decrementBy({ Money: pricePerNFT }));
    zcf.reallocate(buyerSeat, sellerSeat);
    buyerSeat.exit();

    return "Transaction success!";
  }

  const publicFacet = Far("NFTree Drop", {
    makeBuyerInvitation: () => zcf.makeInvitation(buyNFTs, "Purchase an NFTree"),
    getSerial: () => serial,
  });

  return harden({ publicFacet });
};

harden(start);
export { start };
