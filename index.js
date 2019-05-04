let bip39 = require('bip39')
let hdkey = require('ethereumjs-wallet/hdkey')
let Airtable = require('airtable')

require('dotenv').config()

let base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appdHYCV5wDS0Pwts');

let numWallets = 3

void async function main() {
  for (let i = 0; i < numWallets; i++) {
    let mnemonic = bip39.generateMnemonic()
    let wallet = hdkey.fromMasterSeed(mnemonic)

    base('CEO Summit Keys').create({
      "mnemonic": mnemonic
      }, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.getId());
    });
  }
}()
