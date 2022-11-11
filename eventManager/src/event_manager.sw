library event_manager;

use std::{contract_id::ContractId, identity::Identity};

abi eventManager {
    #[storage(read, write)]
    fn create_event(max_capacity: u64, deposit: u64, eventName: str[10]) -> Event;

    #[storage(read, write)]
    fn rsvp(eventId: u64) -> Event;
}

pub struct Event {
    uniqueId: u64,
    maxCapacity: u64,
    deposit: u64,
    owner: Identity,
    name: str[10],
    numOfRSVPs: u64,
}
