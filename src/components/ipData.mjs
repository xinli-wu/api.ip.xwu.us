import dns from 'dns';
import axios from 'axios';
import { isIP } from 'is-ip';

const dnsPromises = dns.promises;
const options = {
  family: 4,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

export async function getGeoIPInfo(params) {

  const query = {
    ...(isIP(params.query) && { ip: params.query }),
    ...(!isIP(params.query) && { domain: params.query })
  };


  if ('domain' in query) {
    const { address, error } = await dnsPromises.lookup(query.domain, options).catch(e => ({ error: { error: true, message: e.message } }));

    if (error) return { error };
    else query.ip = address;
  }

  const url = `https://ipwhois.app/json/${query.ip}`;

  const { data } = await axios.get(url).catch(e => ({ error: { error: true, message: e.message } }));

  const result = { ...query, ...data, full: { ...data } };
  const keepKey = ['ip', 'domain', 'city', 'region', 'country', 'country_code', 'continent', 'isp', 'full'];

  Object.keys(result).forEach((x) => {
    if (!keepKey.includes(x)) delete result[x];
  });

  return { data: result };
};

