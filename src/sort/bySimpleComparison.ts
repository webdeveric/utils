export const bySimpleComparison = <T>(left: T, right: T): number => {
  return left === right ? 0 : left > right ? 1 : -1;
};
