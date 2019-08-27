import { Actor } from './types/schema'

export function actorAddressExists(val: address): Boolean{
  let actor = Actor.load(val.toHext());

  return actor != null;
}