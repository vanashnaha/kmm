type Material = { id: string, label: string }
type Coating = { id: string, label: string }
type Laminate = { id: string, label: string }
type Color = { id: string, label: string }
type Finish = { id: string, label: string }
type Size = { id: string, label: string }

type Product = {
  id: string,
  created: Date,
  updated: Date,
  label: string,
  options: {
    size: null | { value: string[], multiple: boolean },
    material: null | { value: string[], multiple: boolean },
    coating: null | { value: string[], multiple: boolean },
    laminate: null | { value: string[], multiple: boolean },
    size: null | { value: string[], multiple: boolean },
    color: null | { value: string[], multiple: boolean },
    finishing: null | { value: string[], multiple: boolean },
    bundling: null | boolean,
    min: null | number,
    max: null | number
  },


  notes: "",
}


type ProductOptions = Product['options']