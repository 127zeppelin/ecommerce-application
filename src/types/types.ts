import{CustomerUpdateAction }from '@commercetools/typescript-sdk'

export interface RequestBody {
  body: {
    version: number
    actions: CustomerUpdateAction[]
  }
}

export interface ElementOptions {
  tagName: string
  cssClass: string[]
  elementText?: string
  elementHtml?: string
  elementId?: string
  typeElement?: string
  nameElement?: string
  valueElement?: string
  srcAtribute?: string
  altAtribute?: string
  dataCarAtribute?: string
  forElement?: string
}

export interface FilterValues {
  queryArgs?: {
    filter?: string[] | null | undefined;
    sort?: string;
  };
}
