export function checkIfFirefox() {
  let userAgentString = navigator.userAgent;
  let isFirefox = userAgentString.indexOf('Firefox') > -1;
  return isFirefox;
}
