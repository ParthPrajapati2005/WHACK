
interestRates = {
    2012:6.6,
    2013:6.3,
    2014:5.5,
    2015:3.9,
}


def calculateTotalDebtAtEndOfGraduation(startYear, endYear, maintenance):
    tot = 0
    for i in range(startYear+1,endYear+1):
        tot += (9250 + maintenance) * pow((1+interestRates.get(i)/100),i-startYear)
    return tot

