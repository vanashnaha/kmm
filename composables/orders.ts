import { doc, setDoc, deleteDoc } from "firebase/firestore";

export const status = ['Enquiry', 'Quote', 'Order', 'Needs Proof', 'Pending proof approval', 'Pending Production', 'In Production', 'Ready for Pickup', 'Delivered', 'Invoiced', 'Paid', 'Complete']


export const setOrder = async (order: Order) => {
  console.log("Saving order", order.id);
  const { $db } = useNuxtApp();
  return await setDoc(doc($db, "orders", order.id), order)
}

export const deleteOrder = async (id: string) => {
  console.log("Delete Client", id)
  const { $db } = useNuxtApp();
  return await deleteDoc(doc($db, "clients", id))
}

export type Order = {
  id: string,
  created: Date,
  updated: Date,
  clientId: string | null,
  items: OrderItem[],
  notes: string,
  status: string | null,
  subTotal: number,
  tax: number,
  totalAmountDue: number,
  payments: { date: Date, amount: number, method: string }[]
  balanceAmountDue: number,
}

export type OrderItem = {
  id: string,
  productId: string,
  options: {
    size: null | string[],
    material: string[] | null,
    coating: string[] | null,
    laminate: string[] | null,
    color: string[] | null,
    bundling: boolean | null,
    finishing: string[] | null,
  }
  quantity: number,
  cost: number,
  notes: "",
}