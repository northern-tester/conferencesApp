export function setEventName(originalUrl, method) {
  let eventName;
  switch (originalUrl) {
    case "/users":
      if (method === "POST") {
        eventName = "CreateUserSuccess"
      }
      break;
    default:
      eventName = "WebRequestEvent";
      break;
  }
  return eventName
}
