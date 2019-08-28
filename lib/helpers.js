const concat = (a, b) => a.concat(b);

const map = fn => x => x.map(fn);

const inspect = a => {
  //console.log(a);
  return a;
};

const equal = a => b => a === b;

const getProp = p => o => o[p];

const notEmptyString = s => s !== "";

const frequencyReducer = (acc, name) => {
  acc[name] = acc[name] || 0;
  acc[name] += 1;
  return acc;
};

const enumObj = o => ({
  o: o,
  map: fn => Object.keys(o).map(k => o[k]).map(v => fn(v)),
  filter: fn => Object.keys(o).map(k => o[k]).filter(v => fn(v))
});

export { enumObj, map, concat, getProp, frequencyReducer, equal, inspect };
