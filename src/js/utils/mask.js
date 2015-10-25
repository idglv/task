module.exports = function(mask) {
  function isMask(length) {
    return mask[length] && mask[length] !== ' ';
  } 
  function hasSymbol(value, symbol) {
    var result = value + symbol;
    var length = result.length;

    if (isMask(length)) {
      result += mask[length];
    }
    return result;
  }


  function backspace(value) {
    var result = value.slice(0, -1);
    var length = result.length;

   //Если попадаем на символ удаляем еще одну цифру
    if (isMask(length)) {
       result = result.slice(0, -1);
    }
    return result;
  }

  return function(value, symbol) {
    if (symbol) {
      return hasSymbol(value, symbol);
    }
    return backspace(value);
  }
}

