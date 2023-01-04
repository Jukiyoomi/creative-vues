export const formatDate = (timestamp: number) =>
  new Intl.DateTimeFormat("fr-FR").format(timestamp * 1e3);
