export const NFT_COUNT = 7433;

export const trees = (() => {
  import countries from "./countries.js";
  import species from "./species.js";
  const genuses = Object.keys(species);

  class NFTree {
      constructor(name, location, genus, serial, exclusitivity) {
          this.name = name;
          this.location = location;
          this.genus = genus;
          this.serial = serial;
          this.exclusitivity = exclusitivity;
      }
  }

  function randFrom(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  }

  const nfts = [];
  var used = Object.fromEntries(countries.map((k, _) => [k, new Set()]));
  var serial = 1;

  for (var i = NFT_COUNT - 1; i >= 0; i--) {
    let name, genus, location;
    while (!location || used[location].has(name)) {
      genus = randFrom(genuses);
      name = randFrom(species[genus]);
      location = randFrom(countries);
    }
    used[location].add(name);
    nfts.push(new NFTree(name, location, genus, serial, species[genus].length));
    serial++;
  }

  return harden(nfts);
})()
