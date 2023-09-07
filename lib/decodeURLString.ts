export function decodeURLString(urlString: string) {
  var decodedString = decodeURIComponent(urlString.replace(/\+/g, " "));
  return decodedString;
}
