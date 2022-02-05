import CryptoObject from '../src/index';

describe('Testing encrypto Object', () => {
  const payload = { name: 'Winter', teste: 'abc' };
  const phrase = '12345';

  test('Creating encrypted object', async () => {
    const cryptoObject = await new CryptoObject().setData(payload).setSystem('TEST').setExpiration(360).serialize();

    expect(cryptoObject).toHaveLength(254);
  });

  test('Creating instance from crypto object', async () => {
    const cryptoObject = await new CryptoObject().setData(payload).setSystem('TEST').setExpiration(360).serialize();

    const instance = await new CryptoObject().deserialize(cryptoObject, 'TEST');

    expect(instance).toBeInstanceOf(CryptoObject);
    expect(payload).toEqual(instance.getData());
  });

  test('Creating instance from crypto object with password', async () => {
    const cryptoObject = await new CryptoObject(phrase)
      .setData(payload)
      .setSystem('TEST')
      .setExpiration(360)
      .serialize();

    const instance = await new CryptoObject(phrase).deserialize(cryptoObject, 'TEST');

    expect(instance).toBeInstanceOf(CryptoObject);
  });

  test('Creating instance from crypto object with password', async () => {
    const cryptoObject = await new CryptoObject('12345')
      .setData(payload)
      .setSystem('TEST')
      .setExpiration(360)
      .serialize();

    const instance = await new CryptoObject('12345').deserialize(cryptoObject, 'TEST');

    expect(instance).toBeInstanceOf(CryptoObject);
    expect(payload).toEqual(instance.getData());
  });

  test('Creating expired instance from crypto object', async () => {
    const cryptoObject = await new CryptoObject().setData(payload).setExpiration(0).serialize();
    try {
      await new CryptoObject().deserialize(cryptoObject);
    } catch (e: any) {
      expect(e.message).toBe('Expired Crypto Object!');
    }
  });
	
	test('Creating invalid system instance from crypto object', async () => {
    const cryptoObject = await new CryptoObject().setData(payload).setSystem('INVALID').serialize();
    try {
      await new CryptoObject().deserialize(cryptoObject, 'teste');
    } catch (e: any) {
      expect(e.message).toBe('Invalid system!');
    }
  });
});
