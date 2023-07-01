export const toRupiah = (value: number | undefined): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(value as number)
    .replace(/\s/g, '');
};

export const toRupiahWithoutSymbol = (value: number | undefined): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(value as number)
    .replace(/\s/g, '')
    .replace('Rp', '');
};
