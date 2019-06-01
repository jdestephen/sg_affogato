import { LogAddFarm, LogCooperativeAddFarm, LogUpdateFarm, LogCooperativeUpdateFarm } from './types/FarmFactory/FarmFactory'
import { Producer, Farm } from './types/schema'


export function handleNewFarm(event: LogAddFarm): void {
  let farm = new Farm(event.params._id.toString())
  let producer = Producer.load(event.params._ownerAddress.toHex())
  farm.owner = producer.id
  farm.name = event.params._name.toString()
  farm.country = event.params._country.toString()
  farm.region = event.params._region.toString()
  farm.village = event.params._village.toString()
  farm.story = event.params._story

  farm.save()
}

export function handleCooperativeAddFarm(event: LogCooperativeAddFarm): void {
  let farm = new Farm(event.params._id.toString())
  let producer = Producer.load(event.params._ownerAddress.toHex())
  farm.owner = producer.id
  farm.name = event.params._name.toString()
  farm.country = event.params._country.toString()
  farm.region = event.params._region.toString()
  farm.village = event.params._village.toString()
  farm.story = event.params._story

  farm.save()
}

export function handleUpdatedFarm(event: LogUpdateFarm): void {
  let id = event.params._id.toString()
  let farm = Farm.load(id)
  if (farm == null) {
    farm = new Farm(id)
  }
  let producer = Producer.load(event.params._ownerAddress.toHex())
  farm.owner = producer.id
  farm.name = event.params._name.toString()
  farm.country = event.params._country.toString()
  farm.region = event.params._region.toString()
  farm.village = event.params._village.toString()
  farm.story = event.params._story

  farm.save()
}

export function handleCooperativeUpdatedFarm(event: LogCooperativeUpdateFarm): void {
  let id = event.params._id.toString()
  let farm = Farm.load(id)
  if (farm == null) {
    farm = new Farm(id)
  }
  let producer = Producer.load(event.params._ownerAddress.toHex())
  farm.owner = producer.id
  farm.name = event.params._name.toString()
  farm.country = event.params._country.toString()
  farm.region = event.params._region.toString()
  farm.village = event.params._village.toString()
  farm.story = event.params._story

  farm.save()
}