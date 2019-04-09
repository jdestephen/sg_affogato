import { LogAddActor, LogUpdateActor } from './types/ActorFactory/ActorFactory'
import { Actor } from './types/schema'

export function handleNewActor(event: LogAddActor): void {
  let actor = new Actor(event.params._id.toHex())
  actor.name = event.params._name
  actor.typeOfActor = event.params._typeOfActor
  actor.country = event.params._country
  actor.region = event.params._region
  actor.email = event.params._email
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
  actor.name = event.params._name
  actor.typeOfActor = event.params._typeOfActor
  actor.country = event.params._country
  actor.region = event.params._region
  actor.email = event.params._email
  actor.imageHash = event.params._imageHash
  actor.bio = event.params._bio

  actor.save()
}