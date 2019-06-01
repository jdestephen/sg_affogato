import { LogAddActor, LogUpdateActor, LogCooperativeAddActor, LogApproval, LogCooperativeApproval } from './types/ActorFactory/ActorFactory'
import { Producer, Cooperative, Taster } from './types/schema'


export function handleNewActor(event: LogAddActor): void {
    let id = event.params._id.toHex()
    let type = event.params._typeOfActor.toString()
    if (type == 'farmer'){
        let producer = new Producer(id)
        producer.name = event.params._name.toString()
        producer.country = event.params._country.toString()
        producer.region = event.params._region.toString()
        producer.email = event.params._email.toString()
        producer.imageHash = event.params._imageHash
        producer.bio = event.params._bio
        producer.allowedCooperatives = []
        producer.allowedTasters = []

        producer.save()
    }
    if (type == 'cooperative'){
        let cooperative = new Cooperative(id)
        cooperative.name = event.params._name.toString()
        cooperative.country = event.params._country.toString()
        cooperative.region = event.params._region.toString()
        cooperative.email = event.params._email.toString()
        cooperative.imageHash = event.params._imageHash
        cooperative.bio = event.params._bio
        cooperative.save()
    }
    if (type == 'taster'){
        let cooperative = Cooperative.load(id)
        let producer = Producer.load(id)
        if (cooperative == null && producer == null){
            let taster = new Taster(id)
            taster.name = event.params._name.toString()
            taster.country = event.params._country.toString()
            taster.region = event.params._region.toString()
            taster.email = event.params._email.toString()
            taster.imageHash = event.params._imageHash
            taster.bio = event.params._bio
            taster.save()
        }
    }
}


export function handleUpdatedActor(event: LogUpdateActor): void {
  let id = event.params._id.toHex()
  let type = event.params._typeOfActor.toString()

  if (type == 'farmer'){
    let producer = Producer.load(id)
    if (producer == null) {
        producer = new Producer(id)
    }
    producer.name = event.params._name.toString()
    producer.country = event.params._country.toString()
    producer.region = event.params._region.toString()
    producer.email = event.params._email.toString()
    producer.imageHash = event.params._imageHash
    producer.bio = event.params._bio

    producer.save()
  }
  if (type == 'cooperative'){
    let cooperative = Cooperative.load(id)
    if (cooperative == null) {
        cooperative = new Cooperative(id)
    }
    cooperative.name = event.params._name.toString()
    cooperative.country = event.params._country.toString()
    cooperative.region = event.params._region.toString()
    cooperative.email = event.params._email.toString()
    cooperative.imageHash = event.params._imageHash
    cooperative.bio = event.params._bio
    cooperative.save()
  }
  if (type == 'taster'){
    let taster = Taster.load(id)
    if (taster == null) {
        taster = new Taster(id)
    }
    taster.name = event.params._name.toString()
    taster.country = event.params._country.toString()
    taster.region = event.params._region.toString()
    taster.email = event.params._email.toString()
    taster.imageHash = event.params._imageHash
    taster.bio = event.params._bio
    taster.save()
  }
}


export function handleCooperativeAddActor(event: LogCooperativeAddActor): void {
    let id = event.params._id.toHex()
    let type = event.params._typeOfActor.toString()
    let cooperative = Cooperative.load(event.params._cooperativeAddress.toHex())

    if (type == 'farmer'){
        let producer = new Producer(id)

        producer.name = event.params._name.toString()
        producer.country = event.params._country.toString()
        producer.region = event.params._region.toString()
        producer.email = event.params._email.toString()
        producer.imageHash = event.params._imageHash
        producer.bio = event.params._bio
        producer.allowedTasters = []
        let allowedC: Array<String>
        allowedC.push(cooperative.id)
        producer.allowedCooperatives = allowedC

        producer.save()
    }
    else (type == 'taster'){
        let cooperative2 = Cooperative.load(id)
        let producer = Producer.load(id)
        if (cooperative2 == null && producer == null){
            let taster = new Taster(id)
            taster.name = event.params._name.toString()
            taster.country = event.params._country.toString()
            taster.region = event.params._region.toString()
            taster.email = event.params._email.toString()
            taster.imageHash = event.params._imageHash
            taster.bio = event.params._bio
            taster.save()
        }
    }
}

export function handleApproval(event: LogApproval): void{
    let producer = Producer.load(event.params._owner.toHex())

    if (producer != null) {
        let allowedId = event.params._allowed.toHex()
        let taster = Taster.load(allowedId)
        if (taster != null){
            let allowedT: Array<String>
            allowedT = producer.allowedTasters
            allowedT.push(taster.id)
            producer.allowedTasters = allowedT
        }
        else{
            let cooperative = Cooperative.load(allowedId)
            if (cooperative != null){
                let allowedC: Array<String>
                allowedC = producer.allowedCooperatives
                allowedC.push(cooperative.id)
                producer.allowedCooperatives = allowedC
            }
        }
        producer.save()
    }
}

export function handleCooperativeApproval(event: LogCooperativeApproval): void{
    let producer = Producer.load(event.params._owner.toHex())

    if (producer != null) {
        let allowedId = event.params._allowed.toHex()
        let taster = Taster.load(allowedId)
        if (taster != null){
            let allowedT: Array<String>
            allowedT = producer.allowedTasters
            allowedT.push(taster.id)
            producer.allowedTasters = allowedT
        }
        else{
            let cooperative = Cooperative.load(allowedId)
            if (cooperative != null){
                let allowedC: Array<String>
                allowedC = producer.allowedCooperatives
                allowedC.push(cooperative.id)
                producer.allowedCooperatives = allowedC
            }
        }
        producer.save()
    }
}