import { LogAddCupProfile, LogUpdateCupProfile} from './types/TastingFactory/TastingFactory'
import { CupProfile, CoffeeBatch, Taster } from './types/schema'


export function handleAddCupProfile(event: LogAddCupProfile): void {
  let cupProfile = new CupProfile(event.params._id.toString())
  let coffeeBatch = CoffeeBatch.load(event.params._coffeeBatchId.toString())
  let taster = Taster.load(event.params._tasterAddress.toHex())

  if (coffeeBatch != null && taster != null){
      cupProfile.coffeeBatch = coffeeBatch.id
      cupProfile.taster = taster.id
      cupProfile.aroma = event.params._aroma.toString()
      cupProfile.sweetness = event.params._sweetness.toString()
      cupProfile.flavor = event.params._flavor.toString()
      cupProfile.acidity = event.params._acidity.toString()
      cupProfile.body = event.params._body.toString()
      cupProfile.aftertaste = event.params._aftertaste.toString()
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

  cupProfile.aroma = event.params._aroma.toString()
  cupProfile.sweetness = event.params._sweetness.toString()
  cupProfile.flavor = event.params._flavor.toString()
  cupProfile.acidity = event.params._acidity.toString()
  cupProfile.body = event.params._body.toString()
  cupProfile.aftertaste = event.params._aftertaste.toString()
  cupProfile.imageHash = event.params._imageHash.toString()
  cupProfile.cuppingNote = event.params._cuppingNote

  cupProfile.save()
}