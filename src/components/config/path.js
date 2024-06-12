// export const isBaseUrlExist = () => {
//     if (!(typeof window === 'undefined') && document.getElementsByTagName('base')[0] && document.getElementsByTagName('base')[0].href) {
//       const baseUrl = (document.getElementsByTagName('base')[0].href);
//       const splitePath = baseUrl.split('/');
//       const getDomain = `${splitePath[0]}//${splitePath[2]}`;
//       return getDomain;
//     }
//     return null;
//   };
  
  export const getProductionPath = () => {
    console.log("process.env", process.env)
    // let path;
    // if (process.env.SITE_URL) {
    //   path = (process.env.SITE_URL).toString();
    // } else {
    //   path = window.location.origin;
    // }
    // const checkForBaseUrl = isBaseUrlExist();
    // if (checkForBaseUrl) {
    //   path = checkForBaseUrl;
    // }
    // return path;
  };
  
  export const API_PATH = {
    production: {
      API_ROOT: `${window.location.origin}`,
      // API_ROOT: `https://www.eupi-sarthi.in`,
      NODE_API_ROOT: `${getProductionPath()}`,
    //   S3_API_ROOT: `${getProductionPath()}/s3-api/`,
    },
    development: {
      // API_ROOT: 'https://sarathi.lokos.in',
      // API_ROOT: 'https://dev.eupi-sarthi.in'
      API_ROOT : 'https://uat.eupi-sarthi.in'
    },
  };
  