const borderCodes: Readonly<Record<string, string | undefined>> = {
AFG: "AF", AGO: "AO", ALB: "AL", AND: "AD", ARE: "AE",
ARG: "AR", ARM: "AM", AUT: "AT", AZE: "AZ", BDI: "BI",
BEL: "BE", BEN: "BJ", BFA: "BF", BGD: "BD", BGR: "BG",
BIH: "BA", BLR: "BY", BLZ: "BZ", BOL: "BO", BRA: "BR",
BRN: "BN", BTN: "BT", BWA: "BW", CAF: "CF", CAN: "CA",
CHE: "CH", CHL: "CL", CHN: "CN", CIV: "CI", CMR: "CM",
COD: "CD", COG: "CG", COL: "CO", CRI: "CR", CYP: "CY",
CZE: "CZ", DEU: "DE", DJI: "DJ", DNK: "DK", DOM: "DO",
DZA: "DZ", ECU: "EC", EGY: "EG", ERI: "ER", ESH: "EH",
ESP: "ES", EST: "EE", ETH: "ET", FIN: "FI", FRA: "FR",
GAB: "GA", GBR: "GB", GEO: "GE", GHA: "GH", GIB: "GI",
GIN: "GN", GMB: "GM", GNB: "GW", GNQ: "GQ", GRC: "GR",
GTM: "GT", GUF: "GF", GUY: "GY", HKG: "HK", HND: "HN",
HRV: "HR", HTI: "HT", HUN: "HU", IDN: "ID", IND: "IN",
IRL: "IE", IRN: "IR", IRQ: "IQ", ISR: "IL", ITA: "IT",
JOR: "JO", KAZ: "KZ", KEN: "KE", KGZ: "KG", KHM: "KH",
KOR: "KR", KWT: "KW", LAO: "LA", LBN: "LB", LBR: "LR",
LBY: "LY", LIE: "LI", LSO: "LS", LTU: "LT", LUX: "LU",
LVA: "LV", MAC: "MO", MAF: "MF", MAR: "MA", MCO: "MC",
MDA: "MD", MEX: "MX", MKD: "MK", MLI: "ML", MMR: "MM",
MNE: "ME", MNG: "MN", MOZ: "MZ", MRT: "MR", MWI: "MW",
MYS: "MY", NAM: "NA", NER: "NE", NGA: "NG", NIC: "NI",
NLD: "NL", NOR: "NO", NPL: "NP", OMN: "OM", PAK: "PK",
PAN: "PA", PER: "PE", PNG: "PG", POL: "PL", PRK: "KP",
PRT: "PT", PRY: "PY", PSE: "PS", QAT: "QA", ROU: "RO",
RUS: "RU", RWA: "RW", SAU: "SA", SDN: "SD", SEN: "SN",
SLE: "SL", SLV: "SV", SMR: "SM", SOM: "SO", SRB: "RS",
SSD: "SS", SUR: "SR", SVK: "SK", SVN: "SI", SWE: "SE",
SWZ: "SZ", SXM: "SX", SYR: "SY", TCD: "TD", TGO: "TG",
THA: "TH", TJK: "TJ", TKM: "TM", TLS: "TL", TUN: "TN",
TUR: "TR", TZA: "TZ", UGA: "UG", UKR: "UA", UNK: "XK",
URY: "UY", USA: "US", UZB: "UZ", VAT: "VA", VEN: "VE",
VNM: "VN", YEM: "YE", ZAF: "ZA", ZMB: "ZM", ZWE: "ZW",
};
export function getCountryRouteCode(code: string): string | undefined {
const normalized: string = code.trim().toUpperCase();
return /^[A-Z]{2}$/.test(normalized)
? normalized
: borderCodes[normalized];
}