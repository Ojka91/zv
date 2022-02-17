

export default abstract class Globals {


  private static varIsAllowedUserSensitiveData: boolean;
  private static unfilteredResponse: any;

  static enableSensitiveData(isAllowed: boolean) {
    Globals.varIsAllowedUserSensitiveData = isAllowed;
  }

  static isEnabledSensitiveData() : boolean {
    return Globals.varIsAllowedUserSensitiveData;
  }

  static setUnfilteredResponse(unfilteredResponse: any) {
    Globals.unfilteredResponse = unfilteredResponse;
  }

  static getUnfilteredResponse() : any {
    return Globals.unfilteredResponse;
  }

}
