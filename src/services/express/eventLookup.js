export function setEventName(originalUrl, method, statusCode) {
  let eventName;
  switch (originalUrl) {
    case "/users":
      if (method === "POST" && statusCode === 201) {
        eventName = "CreateUserSuccess"
      } else if (method === "POST" && statusCode > 400) {
        eventName = "CreateUserFailure"
      }
      break;
    default:
      eventName = "WebRequestEvent";
      break;
  }
  return eventName
}
