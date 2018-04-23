import m from 'mithril';
import { MNID, Connect, SimpleSigner } from 'uport-connect';

var app = "bitBallot";
var network = "rinkeby";
var clientId = "2ovZkyde72KFb66Dgk3PxCskmeKGxaboydx";
var simplesigner = "11518597e045aefb5d0ba7d317629fc4496300e17e8e93b042132c0975fa5c06";
var ethaddress = "0x233E9cd96D52276B568db3E0911F0FEB24873d47"

export var credentials = {}

export function setCredentials(newCreds) {
	localStorage.setItem("credentials",newCreds)
}

export function deleteCredentials(newCreds) {
	localStorage.removeItem("credentials")
}

export function getCredentials(newCreds) {
    return localStorage.getItem("credentials")
}

export var uport = new Connect(app,{clientId: clientId, network: network, signer: SimpleSigner(simplesigner)})
export var web3 = uport.getWeb3()

export var abiVotes = [{"constant":false,"inputs":[{"name":"event","type":"string"},{"name":"candidate","type":"string"}],"name":"updateVotes","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getVotes","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"type":"function"}];

export var VotesContract = web3.eth.contract(abiVotes);
export var statusInstance = VotesContract.at(ethaddress);

export function checkAddressMNID (addr) {
  if (MNID.isMNID(addr)) {
    return MNID.decode(addr).address
  } else {
    return addr
  }
}

async function getVotes (addr, actions) {
  actions.getCurrentVotesREQUEST()
  VotesContract.getVotes
    .call(addr, (error, votesObject) => {
      if (error) {
        actions.getCurrentVotesERROR(error)
        throw error
      }
      const votesObjectDecoded = votesObject
      // const votesObjectDecoded = votesObject.toObject()
      actions.getCurrentVotesSUCCESS(votesObjectDecoded)
      return votesObjectDecoded
    })
}


const pollingLoop = (address, txHash, response, actions, pendingCB, successCB) => {
  setTimeout(function () {
    web3.eth.getTransaction(txHash, (error, response) => {
      if (error) { throw error }
      if (response === null) {
        response = { blockNumber: null }
      } // Some nodes do not return pending tx
      waitForMined(address, txHash, response, actions, pendingCB, successCB)
    })
  }, 1000) // check again in one sec.
}

async function waitForMined (address, txHash, response, actions, pendingCB, successCB) {
  if (response.blockNumber) {
    const addr = checkAddressMNID(address)
    getVotes(addr, actions)
    successCB()
  } else {
    pendingCB()
    pollingLoop(address, txHash, response, actions, pendingCB, successCB)
  }
}
