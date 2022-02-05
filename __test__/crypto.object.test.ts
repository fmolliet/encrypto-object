import CryptoObject  from '../src/index';

describe('Testing encrypto Object', () => {
    
    test('Creating encrypted object', async() => {
        
        //console.time();
        // Cria o objeto com dados 
        const cryptoObject = await new CryptoObject()
            .setData({name: 'Winter', teste:"abc"})
            .setSystem('TEST')
            .setExpiration(360)
            .serialize();
            
      expect(cryptoObject).toHaveLength(190);
      
    });
  
    test('Creating instance from crypto object', async () => {
        
        const cryptoObject = await new CryptoObject()
            .setData({name: 'Winter', teste:"abc"})
            .setSystem('TEST')
            .setExpiration(360)
            .serialize();
        
        //console.log("Objeto criptografado: " ,cryptoObject)

        const instance = await new CryptoObject().deserialize(cryptoObject, 'TEST');
        
        //console.log("Instancia decriptografado: " , instance)
        //console.timeEnd();
      expect(instance).toBeInstanceOf(CryptoObject);
    });
    
    test('Creating instance from crypto object with password', async () => {
        
        const cryptoObject = await new CryptoObject("12345")
            .setData({name: 'Winter', teste:"abc"})
            .setSystem('TEST')
            .setExpiration(360)
            .serialize();
        
        //console.log("Objeto criptografado: " ,cryptoObject)

        const instance = await new CryptoObject("12345").deserialize(cryptoObject, 'TEST');
        
        //console.log("Instancia decriptografado: " , instance)
        //console.timeEnd();
      expect(instance).toBeInstanceOf(CryptoObject);
    });
    
});
