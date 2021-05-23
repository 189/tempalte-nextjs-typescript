export default function throttle(fn: (...args: any[]) => void, threshhold = 250, scope?: any) {
  let last: number, deferTimer: any;
  return function(..._args: any[]) {
    let context = scope;

    let now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        fn.apply(context, [...args]);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, [...args]);
    }
  };
}
