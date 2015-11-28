var people = [
  {name: 'Крутова', values: [[132]]},
  {name: 'Куликова', values: [[160], [90], [3, 20, 42]]},
  {name: 'Егор', values: [[80]]},
  {name: 'Антон', values: [[267], [29, 12, 46], [3, 55, 21], [10, 27, 31]]}
];

people.forEach(function (item) {
  var overall = item.values.reduce(function (memo, item) {
    return memo + item.reduce(function (result, value) { return result+value; }, 0);
  }, 0);
  console.log(item.name + ' ====== ' + overall);
});
