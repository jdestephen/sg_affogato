import { store } from '@graphprotocol/graph-ts'
import { LogAddCoffeeBatch,
         LogCooperativeAddCoffeeBatch,
         LogUpdateCoffeeBatch,
         LogCooperativeUpdateCoffeeBatch,
         LogDestroyCoffeeBatch,
         LogCooperativeDestroyCoffeeBatch
} from './types/CoffeeBatchFactory/CoffeeBatchFactory'
import { Certificate, CoffeeBatch, Cooperative, Farm, Producer } from './types/schema'


export function handleAddCoffeeBatch(event: LogAddCoffeeBatch): void {
  let coffeeBatch = new CoffeeBatch(event.params._id.toString())
  let producer = Producer.load(event.params._owner.toHex())
  let farm = Farm.load(event.params._farmId.toString())

  coffeeBatch.owner = producer.id
  coffeeBatch.farm = farm.id
  coffeeBatch.altitude = event.params._altitude
  coffeeBatch.variety = event.params._variety.toString()
  coffeeBatch.process = event.params._process.toString()
  coffeeBatch.size = event.params._size
  coffeeBatch.coffeeState = event.params._coffeeState.toString()
  coffeeBatch.additionalInformation = event.params._additionalInformation.toString()

  coffeeBatch.save()
}

export function handleCooperativeAddCoffeeBatch(event: LogCooperativeAddCoffeeBatch): void {
    let coffeeBatch = new CoffeeBatch(event.params._id.toString())
    let producer = Producer.load(event.params._owner.toHex())
    let farm = Farm.load(event.params._farmId.toString())

    coffeeBatch.owner = producer.id
    coffeeBatch.farm = farm.id
    coffeeBatch.altitude = event.params._altitude
    coffeeBatch.variety = event.params._variety.toString()
    coffeeBatch.process = event.params._process.toString()
    coffeeBatch.size = event.params._size
    coffeeBatch.coffeeState = event.params._coffeeState.toString()
    coffeeBatch.additionalInformation = event.params._additionalInformation.toString()

    coffeeBatch.save()
}

export function handleUpdateCoffeeBatch(event: LogUpdateCoffeeBatch): void {
    let id = event.params._id.toString()
    let coffeeBatch = CoffeeBatch.load(id)
    if (coffeeBatch == null) {
        coffeeBatch = new CoffeeBatch(id)
    }
    let producer = Producer.load(event.params._owner.toHex())
    let farm = Farm.load(event.params._farmId.toString())

    coffeeBatch.owner = producer.id
    coffeeBatch.farm = farm.id
    coffeeBatch.altitude = event.params._altitude
    coffeeBatch.variety = event.params._variety.toString()
    coffeeBatch.process = event.params._process.toString()
    coffeeBatch.size = event.params._size
    coffeeBatch.coffeeState = event.params._coffeeState.toString()
    coffeeBatch.additionalInformation = event.params._additionalInformation.toString()

    coffeeBatch.save()
}

export function handleCooperativeUpdateCoffeeBatch(event: LogCooperativeUpdateCoffeeBatch): void {
    let id = event.params._id.toString()
    let coffeeBatch = CoffeeBatch.load(id)
    if (coffeeBatch == null) {
        coffeeBatch = new CoffeeBatch(id)
    }
    let producer = Producer.load(event.params._owner.toHex())
    let farm = Farm.load(event.params._farmId.toString())

    coffeeBatch.owner = producer.id
    coffeeBatch.farm = farm.id
    coffeeBatch.altitude = event.params._altitude
    coffeeBatch.variety = event.params._variety.toString()
    coffeeBatch.process = event.params._process.toString()
    coffeeBatch.size = event.params._size
    coffeeBatch.coffeeState = event.params._coffeeState.toString()
    coffeeBatch.additionalInformation = event.params._additionalInformation.toString()

    coffeeBatch.save()
}

export function handleDestroyCoffeeBatch(event: LogDestroyCoffeeBatch): void {
    let actorAddress = event.params._actorAddress.toHex()
    let coffeeBatchId = event.params._id.toString()

    let producer = Producer.load(actorAddress)
    if (producer != null){
        store.remove('CoffeeBatch', coffeeBatchId)
    }
}

export function handleCooperativeDestroyCoffeeBatch(event: LogCooperativeDestroyCoffeeBatch): void {
    let actorAddress = event.params._actorAddress.toHex()
    let cooperativeAddress = event.params._cooperativeAddress.toHex()
    let coffeeBatchId = event.params._coffeeBatchId.toString()

    let producer = Producer.load(actorAddress)
    let cooperative = Cooperative.load(cooperativeAddress)
    if (producer != null && cooperative != null){
        store.remove('CoffeeBatch', coffeeBatchId)
    }
}