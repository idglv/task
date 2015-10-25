module.exports = function(words) {
  function suffix(number) {
    var lastSymbols = number % 100;
    if (lastSymbols > 10 && lastSymbols < 20) {
      return words[2];
    }

    lastSymbols = number % 10;
    switch (lastSymbols) {
      case 1:
        return words[0];
      case 2:
      case 3:
      case 4:
        return words[1];
      default:
        return words[2];
    }
  }

  return suffix;
}