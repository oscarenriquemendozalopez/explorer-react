import type { Country } from '../types/country';


export const paisUno: Country = {
   names: { common: 'El Salvador' },
   codes: { alpha_2: 'SV' },
   flag: { url_svg: '/flags/El Salvador.png', description: 'Bandera de El Salvador',},
   population: 6300000,
   region: 'América',
   capitals: [{ name: 'San Salvador' }],
};

export const paisDos: Country = {
    names: { common: 'Italia' },
    codes: { alpha_2: 'IT' },
    flag: { url_svg: '/flags/Italia.png', description: 'Bandera de Italia',},
    population: 59000000,
    region: 'Europa',
    capitals: [{ name: 'Roma' }],
};


export const paisTres: Country = {
    names: { common: 'Rusia' },
    codes: { alpha_2: 'RU' },
    flag: { url_svg: '/flags/Rusia.png', description: 'Bandera de Rusia',},
    population: 144000000,
    region: 'Europa',
    capitals: [{ name: 'Moscú' }],
};