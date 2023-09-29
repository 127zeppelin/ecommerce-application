import { CustomerUpdateAction } from '@commercetools/typescript-sdk'

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
  appendInElement?: HTMLElement
}

export interface FilterValues {
  queryArgs?: {
    filter?: string[] | null | undefined
    sort?: string
  }
}



export type HTMLElementTagNameMap = {
  div: HTMLDivElement;
  span: HTMLSpanElement;
  input: HTMLInputElement;
  button: HTMLButtonElement;
  select: HTMLSelectElement;
  option: HTMLOptionElement;
  a: HTMLAnchorElement;
  img: HTMLImageElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  main: HTMLElement;
  p: HTMLElement;
};


export type PageLinks = {
  [key: string]: ObjectLink;
};
type ObjectLink = { url: string; login: boolean | undefined }