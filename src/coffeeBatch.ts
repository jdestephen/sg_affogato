import { LogAddCoffeeBatch, LogCooperativeAddCoffeeBatch, LogUpdateCoffeeBatch, LogCooperativeUpdateCoffeeBatch } from './types/CoffeeBatchFactory/CoffeeBatchFactory'
import { CoffeeBatch, Farm, Producer } from './types/schema'


export function handleAddCoffeeBatch(event: LogAddCoffeeBatch): void {
  let coffeeBatch = new CoffeeBatch(event.params._id.toString())
  let producer = Producer.load(event.params._owner.toHex())
  let farm = Farm.load(event.params._farmUid.toString())

  coffeeBatch.owner = producer.id
  coffeeBatch.farm = farm.id
  coffeeBatch.altitude = event.params._altitude
  coffeeBatch.variety = event.params._variety.toString()
  coffeeBatch.process = event.params._process.toString()
  coffeeBatch.size = event.params._size
  coffeeBatch.isSold = event.params._isSold

  coffeeBatch.save()
}

export function handleCooperativeAddCoffeeBatch(event: LogCooperativeAddCoffeeBatch): void {
    let coffeeBatch = new CoffeeBatch(event.params._id.toString())
    let producer = Producer.load(event.params._owner.toHex())
    let farm = Farm.load(event.params._farmUid.toString())

    coffeeBatch.owner = producer.id
    coffeeBatch.farm = farm.id
    coffeeBatch.altitude = event.params._altitude
    coffeeBatch.variety = event.params._variety.toString()
    coffeeBatch.process = event.params._process.toString()
    coffeeBatch.size = event.params._size
    coffeeBatch.isSold = event.params._isSold

    coffeeBatch.save()
}

export function handleUpdateCoffeeBatch(event: LogUpdateCoffeeBatch): void {
    let id = event.params._id.toString()
    let coffeeBatch = CoffeeBatch.load(id)
    if (coffeeBatch == null) {
        coffeeBatch = new CoffeeBatch(id)
    }
    let producer = Producer.load(event.params._owner.toHex())
    let farm = Farm.load(event.params._farmUid.toString())

    coffeeBatch.owner = producer.id
    coffeeBatch.farm = farm.id
    coffeeBatch.altitude = event.params._altitude
    coffeeBatch.variety = event.params._variety.toString()
    coffeeBatch.process = event.params._process.toString()
    coffeeBatch.size = event.params._size
    coffeeBatch.isSold = event.params._isSold

    coffeeBatch.save()
}

export function handleCooperativeUpdateCoffeeBatch(event: LogCooperativeUpdateCoffeeBatch): void {
    let id = event.params._id.toString()
    let coffeeBatch = CoffeeBatch.load(id)
    if (coffeeBatch == null) {
        coffeeBatch = new CoffeeBatch(id)
    }
    let producer = Producer.load(event.params._owner.toHex())
    let farm = Farm.load(event.params._farmUid.toString())

    coffeeBatch.owner = producer.id
    coffeeBatch.farm = farm.id
    coffeeBatch.altitude = event.params._altitude
    coffeeBatch.variety = event.params._variety.toString()
    coffeeBatch.process = event.params._process.toString()
    coffeeBatch.size = event.params._size
    coffeeBatch.isSold = event.params._isSold

    coffeeBatch.save()
}