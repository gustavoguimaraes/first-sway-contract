/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type {
  Interface,
  FunctionFragment,
  DecodedValue,
  Contract,
  BytesLike,
  BigNumberish,
  InvokeFunction,
  BN,
} from "fuels";

import type { Enum, Option } from "./common";

export type AddressInput = { value: string };

export type AddressOutput = { value: string };

export type ContractIdInput = { value: string };

export type ContractIdOutput = { value: string };

export type EventInput = {
  uniqueId: BigNumberish;
  maxCapacity: BigNumberish;
  deposit: BigNumberish;
  owner: IdentityInput;
  name: string;
  numOfRSVPs: BigNumberish;
};

export type EventOutput = {
  uniqueId: BN;
  maxCapacity: BN;
  deposit: BN;
  owner: IdentityOutput;
  name: string;
  numOfRSVPs: BN;
};

export type IdentityInput = Enum<{
  Address: AddressInput;
  ContractId: ContractIdInput;
}>;

export type IdentityOutput = Enum<{
  Address: AddressOutput;
  ContractId: ContractIdOutput;
}>;

interface EventManagerAbiInterface extends Interface {
  functions: {
    create_event: FunctionFragment;
    rsvp: FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "create_event",
    values: [BigNumberish, BigNumberish, string]
  ): Uint8Array;
  encodeFunctionData(
    functionFragment: "rsvp",
    values: [BigNumberish]
  ): Uint8Array;

  decodeFunctionData(
    functionFragment: "create_event",
    data: BytesLike
  ): DecodedValue;
  decodeFunctionData(functionFragment: "rsvp", data: BytesLike): DecodedValue;
}

export class EventManagerAbi extends Contract {
  interface: EventManagerAbiInterface;
  functions: {
    create_event: InvokeFunction<
      [capacity: BigNumberish, price: BigNumberish, eventName: string],
      EventOutput
    >;

    rsvp: InvokeFunction<[eventId: BigNumberish], EventOutput>;
  };
}
