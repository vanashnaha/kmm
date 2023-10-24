import { Timestamp } from "firebase/firestore";
import { Auth } from 'firebase/auth';
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import { provinceKeys } from "~/composables/provinces";

declare module '#app' {
  interface NuxtApp {
    $auth: Auth,
    $db: Firestore,
    $storage: FirebaseStorage
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: Auth,
    $db: Firestore,
    $storage: FirebaseStorage
  }
}

// types/index.d.ts
declare global {
  type Province = {
    name: string;
    abbreviation: string;
  }

  type ProvinceKey = keyof typeof provinceKeys;

  type Client = {
    clientId: string;
    company: string;
    name: string;
    title: string;
    email: string;
    brokerage: Brokerage;
    notes: string;
    address: {
      office: Address,
      delivery?: Address
    }
    contacts: Contact[];


    tel: {
      work: string,
      cell: string,
      fax: string,
      home: string,
      other: string,
    };
    webURL?: string;
    social?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedIn?: string;

    },
    hasOwnBrand: boolean;
    brandInfo: string;
    walks: walkSet[];
    driveLocation: string;
  }

  type walkSet = {
    walkId: string;
    label: string;
    codes: string[]
  }

  type Address = {
    street: string,
    city: string,
    province: string,
    postalCode: string,
  }

  type Brokerage = {
    name: string;
    parent: string;
    address: Address;
    hasBrandGuide: boolean;
  }

  type Contact = {
    name: string;
    title: string;
    tel: {
      office: string,
      cell: string,
    }
    type: 'agent' | 'assistant' | 'office manager' | 'other' | 'owner';

  }




}

export { };
