export default <T>(Store: new (...args: any[]) => T): ((caller?: string) => T) => {
  let store: T | null = null;
  return function() {
    if (store === null) {
      // console.log("First caller ", caller);
      store = new Store();
    }
    return store as any;
  };
};
