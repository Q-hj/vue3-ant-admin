//  keyof 和 typeof 联合使用

const user = { name: "gzx", age: 16 };

type User = keyof typeof user;
