import dns from 'dns';
import axios from 'axios';
import { isIP } from 'is-ip';

const dnsPromises = dns.promises;
const options = {
  family: 4,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

const getGEOIPInfo = async (params) => {
  const query = {
    ip: isIP(params.query) ? params.query : null,
    domain: isIP(params.query) ? null : params.query,
  };
  let result = null;

  if (query.domain) {
    try {
      const res = await dnsPromises.lookup(query.domain, options);
      if (!isIP(res.address)) {
        throw {
          error: {
            msg: 'DNS lookup error',
          },
        };
      }
      query.ip = isIP(res.address) ? res.address : null;
    } catch (ex) {
      result = ex;
    }
  }
  const url = `https://ipwhois.app/json/${query.ip}`;
  try {
    const res = await axios.get(url);
    result = res.data;
    result = { ...query, ...result };
    result.full = { ...result };
    const keepKey = [
      'ip',
      'domain',
      'city',
      'region',
      'country',
      'country_code',
      'continent',
      'isp',
      'full',
    ];
    Object.keys(result).forEach((itm) => {
      if (!keepKey.includes(itm)) delete result[itm];
    });
  } catch (ex) {
    result = ex;
  } finally {
    return result;
  }
};

export { getGEOIPInfo };
