import { LogAddCertificate,
         LogUpdateCertificate,
         LogAssignCertificate,
         LogUnassignCertificate
} from './types/CertificateFactory/CertificateFactory'
import { CoffeeBatch, Certificate, Certifier, Producer } from './types/schema'


export function handleAddCertificate(event: LogAddCertificate): void {
  let certificate = new Certificate(event.params._id.toString())
  let certifier = Certifier.load(event.params._certifierAddress.toHex())

  if (certifier != null){
      certificate.certifier = certifier.id
      certificate.name = event.params._name.toString()
      certificate.description = event.params._description
      certificate.additionalInformation = event.params._additionalInformation
      if (event.params._imageHash != null)
        certificate.imageHash = event.params._imageHash
      certificate.save()
  }
}

export function handleUpdateCertificate(event: LogUpdateCertificate): void {
  let certificate = Certificate.load(event.params._id.toString())
  let certifier = Certifier.load(event.params._certifierAddress.toHex())

  if (certificate != null && certifier != null){
      certificate.name = event.params._name.toString()
      certificate.description = event.params._description
      certificate.additionalInformation = event.params._additionalInformation
      if (event.params._imageHash != null)
        certificate.imageHash = event.params._imageHash
      certificate.save()
  }
}

export function handleAssignCertificate(event: LogAssignCertificate): void {
  let certificate = Certificate.load(event.params._certificateId.toString())
  let coffeeBatch = CoffeeBatch.load(event.params._coffeeBatchId.toString())

  if (certificate != null && coffeeBatch != null){
      let cBatches: Array<String>
      cBatches = certificate.coffeeBatches
      cBatches.push(coffeeBatch.id)
      certificate.coffeeBatches = cBatches

      certificate.save()
  }
}

export function handleUnassignCertificate(event: LogUnassignCertificate): void {
  let certificate = Certificate.load(event.params._certificateId.toString())
  let coffeeBatch = CoffeeBatch.load(event.params._coffeeBatchId.toString())

  if (certificate != null && coffeeBatch != null){
      let oldCoffeeBatches: Array<String>
      let newCoffeeBatches: Array<String>

      oldCoffeeBatches = certificate.coffeeBatches

      for (let i = 0, k = oldCoffeeBatches.length; i < k; ++i) {
            if (coffeeBatch.id != oldCoffeeBatches[i])
                newCoffeeBatches.push(oldCoffeeBatches[i])
      }

      certificate.coffeeBatches = newCoffeeBatches
      certificate.save()
  }

}