import { store } from '@graphprotocol/graph-ts'
import { LogAddCupProfile, LogUpdateCupProfile, LogDestroyCupProfile} from './types/CupProfileFactory/CupProfileFactory'
import { CupProfile, CoffeeBatch, Taster } from './types/schema'


export function handleAddCupProfile(event: LogAddCupProfile): void {
  let cupProfile = new CupProfile(event.params._id.toString())
  let coffeeBatch = CoffeeBatch.load(event.params._coffeeBatchId.toString())
  let taster = Taster.load(event.params._tasterAddress.toHex())

  if (coffeeBatch != null && taster != null){
      cupProfile.coffeeBatch = coffeeBatch.id
      cupProfile.taster = taster.id
      cupProfile.profile = event.params._profile
      cupProfile.cuppingNote = event.params._cuppingNote
      if (event.params._imageHash != null)
        cupProfile.imageHash = event.params._imageHash
      cupProfile.save()
  }
}

export function handleUpdateCupProfile(event: LogUpdateCupProfile): void {
  let id = event.params._id.toString()
  let cupProfile = CupProfile.load(id)
  if (cupProfile == null) {
    cupProfile = new CupProfile(id)
  }

  cupProfile.profile = event.params._profile
  cupProfile.imageHash = event.params._imageHash
  cupProfile.cuppingNote = event.params._cuppingNote
  cupProfile.save()
}

export function handleDestroyCupProfile(event: LogDestroyCupProfile): void {
    let cupProfile = CupProfile.load(event.params._id.toString())
    let taster = Taster.load(event.params._actorAddress.toHex())

    if (taster != null && cupProfile != null){
        store.remove('CupProfile', cupProfile.id)
    }
}

