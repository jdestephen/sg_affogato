import { store } from '@graphprotocol/graph-ts'
import { LogAddActor,
         LogDestroyActor,
         LogCooperativeAddActor,
         LogCooperativeDestroyActor,
         LogApproval,
         LogCooperativeApproval
} from './types/ActorFactory/ActorFactory'
import { Producer,
         Certifier,
         Cooperative,
         Taster,
         Technician,
         Validator,
         Benefit,
         Roaster
} from './types/schema'


let FARMER = "FARMER";
let COOPERATIVE = "COOPERATIVE";
let CERTIFIER = "CERTIFIER";
let TECHNICIAN = "TECHNICIAN";
let TASTER = "TASTER";
let VALIDATOR = "VALIDATOR";
let BENEFIT = "BENEFIT";
let ROASTER = "ROASTER";


export function handleNewActor(event: LogAddActor): void {
    let actorAddress = event.params._actorAddress.toHex()
    let role = event.params._role.toString()

    if (role == FARMER){
        let producer = new Producer(actorAddress)
        producer.allowedCooperatives = []
        producer.allowedTasters = []
        producer.allowedValidators = []
        producer.save()
    }
    if (role == COOPERATIVE){
        let cooperative = new Cooperative(actorAddress)
        cooperative.save()
    }
    if (role == TASTER){
        let taster = new Taster(actorAddress)
        taster.save()
    }
    if (role == CERTIFIER){
        let certifier = new Certifier(actorAddress)
        certifier.save()
    }
    if (role == TECHNICIAN){
        let technician = new Certifier(actorAddress)
        technician.save()
    }
    if (role == VALIDATOR){
        let validator = new Validator(actorAddress)
        validator.save()
    }
    if (role == BENEFIT){
        let benefit = new Benefit(actorAddress)
        benefit.save()
    }
    if (role == ROASTER){
        let roaster = new Roaster(actorAddress)
        roaster.save()
    }
}

export function handleDestroyActor(event: LogDestroyActor): void {
    let actorAddress = event.params._actorAddress.toHex()
    destroyActor(actorAddress)
}

export function handleCooperativeAddActor(event: LogCooperativeAddActor): void {
    let cooperative = Cooperative.load(event.params._cooperativeAddress.toHex())
    let actorAddress = event.params._actorAddress.toHex()
    let role = event.params._role.toString()

    if (cooperative != null){
        if (role == FARMER){
            let producer = new Producer(actorAddress)
            producer.allowedTasters = []
            producer.allowedValidators = []
            let allowedC: Array<String>
            allowedC.push(cooperative.id)
            producer.allowedCooperatives = allowedC

            producer.save()
        }
        if (role == TASTER){
            let taster = new Taster(actorAddress)
            taster.save()
        }
        if (role == CERTIFIER){
            let certifier = new Certifier(actorAddress);
            certifier.save()
        }
        if (role == TECHNICIAN){
            let technician = new Certifier(actorAddress);
            technician.save()
        }
        if (role == VALIDATOR){
            let validator = new Validator(actorAddress);
            validator.save()
        }
        if (role == BENEFIT){
            let benefit = new Benefit(actorAddress);
            benefit.save()
        }
        if (role == ROASTER){
            let roaster = new Roaster(actorAddress);
            roaster.save()
        }
    }
}

export function handleCooperativeDestroyActor(event: LogCooperativeDestroyActor): void {
    let actorAddress = event.params._actorAddress.toHex()
    let cooperativeAddress = event.params._cooperativeAddress.toHex()
    let cooperative = Cooperative.load(cooperativeAddress)

    if (cooperative != null)
        destroyActor(actorAddress)
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
            else{
                let validator = Validator.load(allowedId)
                if (validator != null){
                    let allowedV: Array<String>
                    allowedV = producer.allowedValidators
                    allowedV.push(validator.id)
                    producer.allowedValidators = allowedV
                }
            }
        }
        producer.save()
    }
}

export function handleCooperativeApproval(event: LogCooperativeApproval): void{
    let cooperative = Cooperative.load(event.params._cooperativeAddress.toHex())
    let producer = Producer.load(event.params._owner.toHex())

    if (producer != null && cooperative != null) {
        let allowedId = event.params._allowed.toHex()
        let taster = Taster.load(allowedId)
        if (taster != null){
            let allowedT: Array<String>
            allowedT = producer.allowedTasters
            allowedT.push(taster.id)
            producer.allowedTasters = allowedT
        }
        else{
            let cooperative2 = Cooperative.load(allowedId)
            if (cooperative2 != null){
                let allowedC: Array<String>
                allowedC = producer.allowedCooperatives
                allowedC.push(cooperative2.id)
                producer.allowedCooperatives = allowedC
            }
            else{
                let validator = Validator.load(allowedId)
                if (validator != null){
                    let allowedV: Array<String>
                    allowedV = producer.allowedValidators
                    allowedV.push(validator.id)
                    producer.allowedValidators = allowedV
                }
            }
        }
        producer.save()
    }
}

function destroyActor(actorAddress: string): void{
    let producer = Producer.load(actorAddress)
    if (producer != null)
        store.remove('Producer', actorAddress)
    else{
        let cooperative = Cooperative.load(actorAddress)
        if (cooperative != null)
            store.remove('Cooperative', actorAddress)
        else{
            let taster = Taster.load(actorAddress)
            if (taster != null)
                store.remove('Taster', actorAddress)
            else{
                let validator = Validator.load(actorAddress)
                if (validator != null)
                    store.remove('Validator', actorAddress)
                else{
                    let certifier = Certifier.load(actorAddress)
                    if (certifier != null)
                        store.remove('Certifier', actorAddress)
                    else{
                        let technician = Technician.load(actorAddress)
                        if (technician != null)
                            store.remove('Technician', actorAddress)
                        else{
                            let benefit = Benefit.load(actorAddress)
                            if (benefit != null)
                                store.remove('Benefit', actorAddress)
                            else{
                                let roaster = Roaster.load(actorAddress)
                                if (roaster != null)
                                    store.remove('Roaster', actorAddress)
                            }
                        }
                    }
                }
            }
        }
    }
}
