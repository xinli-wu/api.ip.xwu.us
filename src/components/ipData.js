import dns from "dns";
import axios from "axios";
import isIp from "is-ip";

const dnsPromises = dns.promises;
const options = {
  family: 4,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

const getGEOIPInfo = async (params) => {
  const query = {
    ip: isIp(params.query) ? params.query : null,
    domain: isIp(params.query) ? null : params.query,
  };
  let result = null;
  if (query.domain) {
    try {
      const res = await dnsPromises.lookup(query.domain, options);
      if (!isIp(res.address)) {
        throw {
          error: {
            msg: "DNS lookup error",
          },
        };
      }
      query.ip = isIp(res.address) ? res.address : null;
    } catch (ex) {
      result = ex;
    }
  }

  const url = `https://api.ipgeolocationapi.com/geolocate/${query.ip}`;
  try {
    const res = await axios.get(url);
    result = res.data;
    result = { ...query, ...result };

    const keepKey = [
      "ip",
      "domain",
      "name",
      "continent",
      "region",
      "subregion",
      "un_locode",
      "languages_official",
      "currency_code",
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
