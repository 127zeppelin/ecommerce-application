export interface RequestBody {
  body: {
    version: number,
    actions: Array<{
      action: string,
      addressId: string,
    }>,
  };
}
