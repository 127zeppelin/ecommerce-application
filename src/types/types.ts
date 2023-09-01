export interface RequestBody {
  body: {
    version: number
    actions: Array<{
      action: string
      addressId: string
    }>
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
}

export interface Car {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
  createdBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
  productType: {
    typeId: string
    id: string
  }
  masterData: {
    current: MasterData
    staged: MasterData
    published: boolean
    hasStagedChanges: boolean
  }
  key: string
  priceMode: string
  lastVariantId: number
}

export interface MasterData {
  name: {
    'en-US': string
  }
  slug: {
    'en-US': string
  }
  description: {
    'en-US': string
  }
  categories: {
    typeId: string
    id: string
  }[]
  masterVariant: {
    images: [
      {
        url: string
      },
    ],
    prices: [
      {
        value: {
          centAmount: number
          currencyCode: string
        },
        discounted: {
          value: {
            centAmount: number
            currencyCode: string
          },  
        }
      },
    ]
    attributes: [
      {
        name: string
        value: any
      },
    ]
  }
}

export interface CarResponse {
  body: {
    limit: number
    offset: number
    count: number
    total: number
    results: Car[]
  }
}
