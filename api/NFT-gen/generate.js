import countries from "./countries.js";
import species from "./species.js";

class NFTree {
    constructor(name, location, genus) {
        this.name = name;
        this.location = location;
        this.genus = genus;
    }
}

function randFrom(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

// it's hideous, but I'm too lazy to optimize it. we're only doing it once, eh?
export default function generate(count) {
  var nfts = [];
  var used = Object.fromEntries(countries.map((k, _) => [k, new Set()]));
  var genuses = Object.keys(species);

  for (var i = count - 1; i >= 0; i--) {
    let name, genus, location;
    while (!location || used[location].has(name)) {
      genus = randFrom(genuses);
      name = randFrom(species[genus]);
      location = randFrom(countries);
    }
    used[location].add(name);
    nfts.push(new NFTree(name, location, genus));
  }

  return nfts;
}
