import { doc, setDoc, deleteDoc } from "firebase/firestore";
export const setClient = async (client: Client) => {
  console.log("Saving client", client);
  const { $db } = useNuxtApp();
  return await setDoc(doc($db, "clients", client.clientId), client)
}

export const deleteClient = async (clientId: string) => {
  console.log("Delete Client", clientId)
  const { $db } = useNuxtApp();
  return await deleteDoc(doc($db, "clients", clientId))
}

export const clientTemplate = {
  clientId: '',
  name: '',
  email: '',
  webURL: "",
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedIn: ""
  },
  contacts: [],
  tel: {
    work: '',
    cell: '',
    fax: '',
    home: '',
    other: '',

  },
  title: '',
  company: '',
  address: {
    office: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
    },
    delivery: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
    }
  },
  hasOwnBrand: false,
  brandInfo: "",
  walks: [],
  brokerage: {
    name: "",
    parent: "",
    address: {
      street: "",
      city: "",
      province: "",
      postalCode: "",
    },
    hasBrandGuide: false,
  },
  driveLocation: "",
  notes: ""
}

export type Client = typeof clientTemplate;