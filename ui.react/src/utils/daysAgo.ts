function daysAgo(date: string) {
  return `${Math.floor((+new Date() - +new Date(date)) / 1000 / 60 / 60 / 24)} day(s) ago`
}

export default daysAgo;