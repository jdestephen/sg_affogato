import { LogAddActor, LogUpdateActor } from './types/ActorFactory/ActorFactory'
import { LogAddFarm, LogCooperativeAddFarm, LogUpdateFarm, LogCooperativeUpdateFarm } from './types/FarmFactory/FarmFactory'
import { Actor, Farm } from './types/schema'

export function handleNewActor(event: LogAddActor): void {
  let actor = new Actor(event.params._id.toHex())
  actor.name = event.params._name.toString()
  actor.typeOfActor = event.params._typeOfActor.toString()
  actor.country = event.params._country.toString()
  actor.region = event.params._region.toString()
  actor.email = event.params._email.toString()
  actor.imageHash = event.params._imageHash
  actor.bio = event.params._bio

  actor.save()
}

export function handleUpdatedActor(event: LogUpdateActor): void {
  let id = event.params._id.toHex()
  let actor = Actor.load(id)
  if (actor == null) {
    actor = new Actor(id)
  }
  actor.name = event.params._name.toString()
  actor.typeOfActor = event.params._typeOfActor.toString()
  actor.country = event.params._country.toString()
  actor.region = event.params._region.toString()
  actor.email = event.params._email.toString()
  actor.imageHash = event.params._imageHash
  actor.bio = event.params._bio

  actor.save()
}


export function handleNewFarm(event: LogAddFarm): void {
  let farm = new Farm(event.params._id.toHex())
  farm.owner = event.params._ownerAddress.toHex()
  farm.name = event.params._name.toString()
  farm.country = event.params._country.toString()
  farm.region = event.params._region.toString()
  farm.village = event.params._village.toString()
  farm.story = event.params._story

  farm.save()
}

export function handleCooperativeAddFarm(event: LogCooperativeAddFarm): void {
  let farm = new Farm(event.params._id.toHex())
  farm.owner = event.params._ownerAddress.toHex()
  farm.name = event.params._name.toString()
  farm.country = event.params._country.toString()
  farm.region = event.params._region.toString()
  farm.village = event.params._village.toString()
  farm.story = event.params._story

  farm.save()
}

export function handleUpdatedFarm(event: LogUpdateFarm): void {
  let id = event.params._id.toHex()
  let farm = Farm.load(id)
  if (farm == null) {
    farm = new Farm(id)
  }
  farm.owner = event.params._ownerAddress.toHex()
  farm.name = event.params._name.toString()
  farm.country = event.params._country.toString()
  farm.region = event.params._region.toString()
  farm.village = event.params._village.toString()
  farm.story = event.params._story

  farm.save()
}

export function handleCooperativeUpdatedFarm(event: LogCooperativeUpdateFarm): void {
  let id = event.params._id.toHex()
  let farm = Farm.load(id)
  if (farm == null) {
    farm = new Farm(id)
  }
  farm.owner = event.params._ownerAddress.toHex()
  farm.name = event.params._name.toString()
  farm.country = event.params._country.toString()
  farm.region = event.params._region.toString()
  farm.village = event.params._village.toString()
  farm.story = event.params._story

  farm.save()
}