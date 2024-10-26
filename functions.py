
interestRates = {
    2012:6.6,
    2013:6.3,
    2014:5.5,
    2015:3.9,
    2016:4.6,
    2017:6.1,
    2018:6.3,
    2019:5.4,
    2020:5.6,
    2021:5.3,
    2022:4.4,
    2023:6.9,
    2024:7.6,

}


def calculateTotalDebtAtEndOfGraduation(startYear, endYear, maintenance):
    tot = 0
    for i in range(startYear+1,endYear+1):
        if i>2024:
            val = 5.5
        else:
            val = interestRates.get(i)
        tot += (9250 + maintenance) * pow((1+val/100),i-startYear)
    return tot

