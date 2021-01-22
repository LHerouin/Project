

export function testMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      return next(action);
    };
  };
}