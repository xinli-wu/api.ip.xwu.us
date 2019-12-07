import dns from 'dns';
import axios from 'axios';
import isIp from 'is-ip';

const lookupPromise = async (domain) => {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address) => {
      if (err) reject(err);
      resolve(address);
    });
  });
};

const getGEOIPInfo = async params => {
  const query = {
    ip: isIp(params.query) ? params.query : null
    , domain: isIp(params.query) ? null : params.query
  };
  let result = null;
  if (!isIp(params.query)) {
    try {
      query.ip = await lookupPromise(query.domain);
    } catch (error) {
      result = error;
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