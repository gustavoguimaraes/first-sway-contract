import { useEffect, useState } from 'react';

import { Wallet, BytesLike, AbstractAddress } from "fuels";
import './App.css';

// Import the contract factory
import { EventManagerAbi__factory } from "./contracts"

const eventManagerContractAddress = process.env.REACT_APP_EVENT_MANAGER_ADDRESS as string | AbstractAddress

const walletPK = process.env.REACT_APP_WALLET_PRIVATE_KEY as BytesLike

// testnet
const rcpProvider = process.env.REACT_APP_RPC_PROVIDER

// create a Wallet instance from given privateKey
const wallet = Wallet.fromPrivateKey(walletPK, rcpProvider)

// Connects out Contract instance to the deployed contract
// address using the given wallet
const contract = EventManagerAbi__factory.connect(eventManagerContractAddress, wallet)

function App() {
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState('')
  const [eventName, setEventName] = useState('')
  const [maxCap, setMaxCap] = useState(0)
  const [userBalance, setUserBalance] = useState('')
  const [deposit, setDeposit] = useState(0)
  const [eventCreation, setEventCreation] = useState(false)
  const [rsvpConfirmed, setRSVPConfirmed] = useState(false)
  const [numOfRSVPs, setNumOfRSVPs] = useState(0);

  useEffect(() => {
    const getBalances = async () => {
      const balances = await wallet.getBalances()

      const balancesFormatted = balances.map(bal => ([bal.assetId, bal.amount.format()]))

      console.log('Wallet balances', balancesFormatted);

      const amount = balancesFormatted[0][1]
      setUserBalance(String(amount))
    }

    getBalances()
  }, [])

  async function rsvpToEvent() {
    setLoading(true);
    try {
      console.log('amount deposit: ', deposit)

      const { value, transactionResponse, transactionResult } = await contract.functions.rsvp(eventId).callParams({
        forward: [deposit]

        // variable outputs is when a transaction creates a new dynamic UTXO
        // for each transaction you do, you'll need another variable output
        // for now, you have to set it manually, but the TS team is working on an issue to set this automatically

      }).txParams({ gasPrice: 1, variableOutputs: 1 }).call()

      console.log(transactionResult);
      console.log(transactionResponse);
      console.log("RSVP'd to the following event", value);
      console.log("deposit value", value.deposit.toString());
      console.log("# of RSVPs", value.numOfRSVPs.toString());
      setNumOfRSVPs(value.numOfRSVPs.toNumber());
      setEventName(value.name.toString());
      setEventId(value.uniqueId.toString());
      setMaxCap(value.maxCapacity.toNumber());
      setDeposit(value.deposit.toNumber());

      console.log("event name", value.name);
      console.log("event capacity", value.maxCapacity.toString());
      console.log("eventID", value.uniqueId.toString())
      setRSVPConfirmed(true);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function createEvent(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("creating event")
      const { value } = await contract.functions.create_event(maxCap, deposit, eventName).txParams({ gasPrice: 1 }).call();

      console.log("return of create event", value);
      console.log("deposit value", value.deposit.toString());
      console.log("event name", value.name);
      console.log("event capacity", value.maxCapacity.toString());
      console.log("eventID", value.uniqueId.toString())
      setEventId(value.uniqueId.toString())
      setEventCreation(true);
      alert('Event created');
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main">
      <div className="header">Building on Fuel with Sway - Event Manager</div>
      <div className="header">User ETH Balance: {userBalance}</div>
      <div className="form">
        <h2>Create Your Event Today!</h2>
        <form id="createEventForm" onSubmit={createEvent}>
          <label className="label">Event Name</label>
          <input className="input" value={eventName} onChange={e => setEventName(e.target.value)} name="eventName" type="text" placeholder="Enter event name" />
          <label className="label">Max Cap</label>
          <input className="input" value={maxCap} onChange={e => setMaxCap(+e.target.value)} name="maxCapacity" type="text" placeholder="Enter max capacity" />
          <label className="label">Deposit</label>
          <input className="input" value={deposit} onChange={e => setDeposit(+e.target.value)} name="price" type="number" placeholder="Enter price" />
          <button className="button" disabled={loading}>
            {loading ? "creating..." : "create"}
          </button>
        </form>
      </div>
      <div className="form">
        <h2>RSVP to an Event</h2>
        <label className="label">Event Id</label>
        <input className="input" name="eventId" onChange={e => setEventId(e.target.value)} placeholder="pass in the eventID" />
        <button className="button" onClick={rsvpToEvent}>RSVP</button>
      </div>
      <div className="results">
        <div className="card">
          {eventCreation &&
            <>
              <h1> New event created</h1>
              <h2> Event Name: {eventName} </h2>
              <h2> Event ID: {eventId}</h2>
              <h2>Max capacity: {maxCap}</h2>
              <h2>Deposit: {deposit}</h2>
              <h2>Num of RSVPs: {numOfRSVPs}</h2>
            </>
          }
        </div>
        {rsvpConfirmed && <>
          <div className="card">
            <h1>RSVP Confirmed to the following event: {eventName}</h1>
            <p>Num of RSVPs: {numOfRSVPs}</p>
          </div>
        </>}
      </div>
    </div>

  );

}

export default App;
