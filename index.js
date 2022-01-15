// The Evervault Node.js SDK (https://docs.evervault.com/sdk/nodejs) is pre-initialized in 
// all Cages as the globally-scoped `evervault` object.This allows you to encrypt the result, 
// and store it in your database.

// `data` is the data you encrypted and passed into `evervault.run` from your server. The Cage 
// automatically decrypts the data and maintains its structure so you can treat event exactly as 
// you did when you passed it into `evervault.run`.
exports.handler = async (data) => {
  // Check if the data sent into the Cage included the `name` key
  if (data.email && typeof data.email === "string") {
    
    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
    const isValid = validateEmail(data.email);

    // Process the decrypted name value, and re-encrypt the original name using the globally available evervault package.
    // Note all Cages have the evervault SDK automatically injected into their global scope.
    return {
      message: `${isValid}`,
      name: await evervault.encrypt(data.email),
    };
  } else {
    console.debug('An empty name has arrived into the Cage.');

    return {
      message: 'Hello from a Cage! Send an encrypted `name` parameter to show Cage decryption in action',
    };
  }
};
