export default class UuDockitUtils {
  static toUu5(dockitJson) {
    let uuDocKitObject;
    if (typeof dockitJson === 'string') {
      uuDocKitObject = JSON.parse(dockitJson);
    } else {
      uuDocKitObject = dockitJson;
    }

    return '<uu5string/>' + uuDocKitObject.body.map(part => part.substring('<uu5string/>'.length)).join('\n');
  }
}
