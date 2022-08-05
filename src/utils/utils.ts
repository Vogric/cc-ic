class Utils {

  static getCardTitleFormatted = ( hostname: string ): string => {
    const splitHostnameAfterHyphen = hostname.split('-')[0];
    return splitHostnameAfterHyphen.toUpperCase();
  }

  static getTimeFormatted = ( time: string ): string => {
    const d = new Date(time);
    return d.toLocaleTimeString('en-US',{hourCycle: 'h23'}).split(' ')[0];
  }

  static getStatusFormatted = ( status: string ): string => {
    const statusMessageWithoutsSpaces = status.split(' ')[0];
    return statusMessageWithoutsSpaces.split(':')[0];
  }

  static getCardErrorTitleFormatted = ( hostname: string ): string => {
    const splitHostnameAfterHyphen = hostname.split('/')[3];
    return splitHostnameAfterHyphen.toUpperCase();
  }

}

export default Utils;
