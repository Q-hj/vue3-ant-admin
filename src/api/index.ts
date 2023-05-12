const apiModules = import.meta.glob("./modules/*.ts", {
  eager: true,
});

const apis = Object.values(apiModules);
console.log(apis);
// console.log(apis[0].login);
export default apis;
