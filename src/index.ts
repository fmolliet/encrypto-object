import { createCipheriv, createDecipheriv, scryptSync, randomBytes } from 'crypto';
const _key = "0ddc95de15a30527024c39567e1553b9a98ae943a0fe8df459aa9025944c3b50a6fc154b33a1544845c3766a4ee5c70c9f5d8b866052712d57d3fd9193c37f0563628c832036db7fcd9865b2b0c9422f7f297ff1de5ff68e2367f8f5c77dd1c5e58fef9f0c1b2f5be7b174279b0a71b5b54384e49d16730081f16807f107c480";

interface CryptoData {
    [key: string]: string
}
class CryptoObject {

    private _data: CryptoData = {};
    
    private _system: string | undefined;
    private _password: string | undefined;
    private _createAt: number = new Date().getTime();
    private _expiration: number = 3600;
    
    public getSystem(): string {
        return this._system || '';
    }
    
    public setSystem( system : string ){
        this._system = system;
        return this;
    }
    
    public getData(): CryptoData {
        return this._data;
    }
    
    public getExpiration() : number{
        return this._expiration + this._createAt;
    }
    
    public setExpiration( expiration : number ){
        this._expiration = expiration * 1000;
        return this;
    }
    
    public setPhrase( phrase : string ){
        this._password = phrase;
        return this;
    }

    public setData( data: CryptoData ) {
        this._data = data;
        return this;
    }
    
    constructor(){}
    
    public async deserialize( cryptoObject : string, system: string, password: string | undefined= undefined ){
        
        if ( password ){
            this.setPhrase( password )
        }
        
        const encrypted = cryptoObject.split('#');
        
        const decrypted = await this.decrypt(  encrypted[0], encrypted[1], encrypted[2] );
        
        const instance: CryptoObject = Object.assign(   
            new CryptoObject(),
            JSON.parse(
                decrypted
            )
        );
        
        if ( instance.getExpiration() < new Date().getTime() ){
            throw new Error('Expired Crypto Object!');
        }
        
        if ( instance.getSystem() && instance.getSystem() !== system){
            throw new Error('Invalid system!');
        }
        
        return instance;
    }
    
    decrypt( encrypted: string , iv : string, auth: string){
        
        const key = scryptSync(this._password||_key, 'salt', 32);
            
        const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'base64'));
        decipher.setAuthTag(Buffer.from(auth,'base64'));
        decipher.setEncoding('base64');
        
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64')), decipher.final()]);
            
        return decrpyted.toString();
    }

    encrypt(data: string ){
        
        const key = scryptSync(this._password||_key, 'salt', 32 );
        
        const iv = randomBytes(16);
        
        const cipher = createCipheriv('aes-256-gcm', key, iv);
    
        let encrypted = Buffer.concat([cipher.update(data),cipher.final()]).toString('base64');
        const auth = cipher.getAuthTag().toString('base64');
        
        return { encrypted , iv: iv.toString('base64'), auth };
    }
    
    public async serialize() : Promise<string>{
        return new Promise( ( resolve, reject )=>{
            const { encrypted , iv, auth } = this.encrypt(JSON.stringify(this));
            
            resolve(`${encrypted}#${iv}#${auth}`);
        });
    }
} 

(async ()=>{
    console.time() 
    // Cria o objeto com dados
    const cryptoObject = await new CryptoObject()
        .setData({name: 'Winter', teste:"abc"})
        .setSystem('TEST')
        .setExpiration(360)
        .serialize();
    
    console.log("Objeto criptografado: " ,cryptoObject)
    // Passa para o outro lado 
    const classeNova = await new CryptoObject().deserialize(cryptoObject, 'TEST');
    
    console.log("Instancia decriptografado: " , classeNova)
    console.timeEnd();
})();

