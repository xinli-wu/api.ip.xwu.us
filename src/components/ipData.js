import dns from 'dns';
import axios from 'axios';
import isIp from 'is-ip';

const dnsPromises = dns.promises;
const options = {
  family: 4,
  hints: dns.ADDRCONFIG | dns.V4MAPPED
};

const getGEOIPInfo = async params => {
  const query = {
    ip: isIp(params.query) ? params.query : null
    , domain: isIp(params.query) ? null : params.query
  };
  let result = null;
  if (!isIp(params.query)) {
    try {
      const res = await dnsPromises.lookup(query.domain, options);
      query.ip = res.address;
    } catch (ex) {
      result = ex;
    }
  };

  const url = `https://api.ipgeolocationapi.com/geolocate/${query.ip}`;
  try {
    const res = await axios.get(url, {});
    result = res.data;
    result = { ...query, ...result }
  } catch (ex) {
    result = ex
  } finally {
    return result;
  }
}

export {
  getGEOIPInfo
}