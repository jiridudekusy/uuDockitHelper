export default class UuDockitUtils {
  static toUu5(dockitJson) {
    let uuDocKitObject;
    if (typeof dockitJson === "string") {
      uuDocKitObject = JSON.parse(dockitJson);
    } else {
      uuDocKitObject = dockitJson;
    }
    let body = uuDocKitObject.body;
    if (!Array.isArray(body)) {
      body = [body];
    }

    return "<uu5string/>" + body.map(part => part.substring("<uu5string/>".length)).join("\n");
  }
}
