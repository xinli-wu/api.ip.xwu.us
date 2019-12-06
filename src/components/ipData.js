import axios from 'axios';

const getGEOIPInfo = async params => {
  const url = `https://api.ipgeolocationapi.com/geolocate/${params.ip}`
  let result = null;
  try {
    const response = await axios.get(url, {});
    result = response.data;
    result = { ...{ ip: params.ip }, ...result }
  } catch (ex) {
    result = ex
  } finally {
    return result;
  }
}

export {
  getGEOIPInfo
}