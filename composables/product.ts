
import { doc, setDoc, deleteDoc } from "firebase/firestore";

const types: Product[] = [
  // { id: 'bcard', label: "business cards" },
  // { id: 'pcard', label: "post-cards" },
  // { id: 'fts', label: "feature sheets" },
  // { id: 'coroplast', label: "Coroplast Sign" }
];

export const materials: Material[] = [
  { id: '14pt', label: "14pt Paper" },
  { id: '16pt', label: "16pt Paper" },

]

export const coatings: Coating[] = [

  { id: 'c2s', label: "C2S" },
  { id: 'c1s', label: "C1S" },
]

export const laminates: Laminate[] = [
  { id: 'gloss', label: "Gloss" },
  { id: 'matte', label: "Matte" },
  { id: 'soft-touch', label: "Soft Touch" },
  { id: 'satin', label: "Satin" },
  { id: 'aqua', label: "Aqua" },
  { id: 'dry-erase', label: "Dry Erase" },
  { id: 'anti-graffiti', label: "Anti-Graffiti" },
  { id: 'anti-microbial', label: "Anti-Microbial" },
  { id: 'anti-slip', label: "Anti-Slip" },
]


export const colors: Color[] = [
  { id: '4/4', label: "4/4" },
  { id: '4/0', label: "4/0" },
  { id: '4/1', label: "4/1" },
  { id: '1/0', label: "1/0" },
  { id: '1/1', label: "1/1" },
]

export const finishings: Finish[] = [
  { id: 'cutting', label: "Cutting" },
  { id: 'folding', label: "Folding" },
  { id: 'perforation', label: "Perforation" },
  { id: 'scoring', label: "Scoring" },
  { id: 'numbering', label: "Numbering" },
  { id: 'die-cutting', label: "Die Cutting" },
  { id: 'round-corners', label: "Round Corners" },
  { id: 'shrink-wrapping', label: "Shrink Wrapping" },
  { id: 'padding', label: "Padding" },
  { id: 'drilling', label: "Drilling" },
  { id: 'collating', label: "Collating" },
  { id: 'stapling', label: "Stapling" },
  { id: 'saddle-stitching', label: "Saddle Stitching" },
  { id: 'perfect-binding', label: "Perfect Binding" },
  { id: 'spiral-binding', label: "Spiral Binding" },
  { id: 'gbc-binding', label: "GBC Binding" },
  { id: 'laminating', label: "Laminating" },
  { id: 'mounting', label: "Mounting" },
  { id: 'foiling', label: "Foiling" },
  { id: 'embossing', label: "Embossing" },
  { id: 'debossing', label: "Debossing" },
  { id: 'spot-uv', label: "Spot UV" },
  { id: 'custom', label: "Custom" },
]

export const sizes: Size[] = [
  { id: '2x3.5', label: "2\" x 3.5\"" },
  { id: '2x6', label: "2\" x 6\"" },
  { id: '3x4', label: "3\" x 4\"" },
  { id: '3x5', label: "3\" x 5\"" },
  { id: '3x6', label: "3\" x 6\"" },
  { id: '3x7', label: "3\" x 7\"" },
]

export function setProduct(product: Product) {
  console.log("Set Product", product)

  const { $db } = useNuxtApp();
  return setDoc(doc($db, "products", product.id), product);
}

export function deleteProduct(id: string) {
  console.log("Delete Product", id)

  const { $db } = useNuxtApp();
  return deleteDoc(doc($db, "products", id));
}