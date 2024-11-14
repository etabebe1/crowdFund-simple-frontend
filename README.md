# crowdFund-simple-frontend

This is a minimalistic example what you can find in the [metamask docs](https://docs.metamask.io/guide/create-dapp.html#basic-action-part-1).

- [html-fund-me-cu](#crowdFund-simple-frontend)
- [Requirements](#requirements)
    - [Optional Gitpod](#optional-gitpod)
- [Quickstart](#quickstart)
  - [Execute a transaction - Local EVM](#execute-a-transaction---local-evm)
  

# Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you've installed it right if you can run:
    - `git --version`
- [Metamask](https://metamask.io/)
  - This is a browser extension that lets you interact with the blockchain.

# Quickstart 

1. Clone the repo

```
git clone https://github.com/etabebe1/crowdFund-simple-frontend
cd crowdFund-simple-frontend
```

2. Run the `index.html` file

You can usually just double click the file to "run it in the browser". Or you can right click the file in your VSCode and run "open with live server" if you have the live server VSCode extension (ritwickdey.LiveServer).

And you should see a small button that says "connect".

![Connect](connect.png)

Hit it, and you should see metamask pop up.

## Execute a transaction - Local EVM

If you want to execute a transaction follow this, you'll need to setup a chain. We have support for both foundry and moccasin. 

> Foundry

1. You'll need to open up a second terminal and run:

```
git clone https://github.com/etabebe1/foundry-crowdFund-wt
cd foundry-crowdFund-wt
make build
make anvil
```

Then, in a second terminal
```
make deploy
```
then
```
anvil
```

Then, in a second terminal
```
just deploy
```

This will deploy a sample contract and start a local hardhat blockchain. 

After you've deployed with either foundry or moccasin, you can should then:

2. Update your `constants.js` with the new contract address.

In your `constants.js` file, update the variable `contractAddress` with the address of the deployed "FundMe" contract. You'll see it near the top of the hardhat output.

3. Connect your [metamask](https://metamask.io/) to your local hardhat blockchain.

> **PLEASE USE A METAMASK ACCOUNT THAT ISNT ASSOCIATED WITH ANY REAL MONEY.**
> I usually use a few different browser profiles to separate my metamasks easily.

In the output of the above command, take one of the private key accounts and [import it into your metamask.](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account)

Additionally, add your localhost with chainid 31337 to your metamask.

4. Refresh the front end, input an amount in the text box, and hit `fund` button after connecting

If you want to execute a transaction follow this:

> Foundry


