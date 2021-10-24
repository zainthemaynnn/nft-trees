// @ts-check

import fs from 'fs';
import '@agoric/zoe/exported.js';
import { E } from '@agoric/eventual-send';
import { resolve as importMetaResolve } from 'import-meta-resolve';

export default async function deployContract(
  homePromise,
  { bundleSource, pathResolve },
) {
  const home = await homePromise;
  const { zoe, board } = home;

  const bundle = await bundleSource(pathResolve(`./src/contract.js`));
  const installation = await E(zoe).install(bundle);

  const CONTRACT_NAME = "NFTree Market";
  const INSTALLATION_BOARD_ID = await E(board).getId(installation);
  console.log('- SUCCESS! contract code installed on Zoe');
  console.log(`-- Contract Name: ${CONTRACT_NAME}`);
  console.log(`-- Installation Board Id: ${INSTALLATION_BOARD_ID}`);

  // Save the constants somewhere where the UI and api can find it.
  const dappConstants = {
    CONTRACT_NAME,
    INSTALLATION_BOARD_ID,
  };

  const defaultsFolder = pathResolve(`../ui/src/conf`);
  const defaultsFile = pathResolve(`../ui/src/conf/installationConstants.js`);
  console.log('writing', defaultsFile);
  const defaultsContents = `\
// GENERATED FROM ${pathResolve('./deploy.js')}
export default ${JSON.stringify(dappConstants, undefined, 2)};
`;
  await fs.promises.mkdir(defaultsFolder, { recursive: true });
  await fs.promises.writeFile(defaultsFile, defaultsContents);
}
