//Solution using arguments keyword
function sum() { 
  let totalSum = 0; 

  for (let i = 0; i < arguments.length; i++) { 
    totalSum += arguments[i]; 
  }

  return totalSum;
}

//Solution using ...rest operator 
function sumRest(...args) { 
  let totalSum = 0; 

  args.forEach(num => { 
    return totalSum += num; 
  })

  return totalSum; 
}

//Solution using arguments keyword
Function.prototype.myBind1 = function(context) { 
  const bindArgs = Array.from(arguments).slice(1); 
  return () => { 
    const callArgs = Array.from(arguments); 
    return this.apply(context, bindArgs.concat(callArgs)); 
  }
}

//Solution using ... rest operator  
Function.prototype.myBind2 = function(context, ...bindArgs) {
  return (...callArgs) => { 
    this.apply(context, bindArgs.concat(callArgs)); 
  }
};

function curriedSum(numArgs) { 
  let numbers = []; 

  function _curriedSum(num) { 
    numbers.push(num); 

    if (numbers.length === numArgs) { 
      return sum(...numbers); 
    } else { 
      return _curriedSum; 
    }
  }
  return _curriedSum; 
}

//Using apply
Function.prototype.curry1 = function(numArgs) { 
  let args = []; 
  self = this; 
  
  function _curry1(arg) { 
    args.push(arg); 
    if (args.length === numArgs) { 
      return self.apply(null, args); 
    } else { 
      return _curry1; 
    }
  }

  return _curry1; 
}

Function.prototype.curry2 = function(numArgs) { 
  let args = []; 

  const _curry2 = (arg) => { 
    args.push(arg); 
    if (args.length === numArgs) { 
      return this(...args); 
    } else { 
      return _curry2; 
    }
  }

  return _curry2;
}