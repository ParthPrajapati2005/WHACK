import joblib
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

def suggestSpendingMl(totalMonthlyIncome):
    accom_model = joblib.load("./models/Student_Accommodation_model.joblib")
    util_model = joblib.load("./models/Utilities_model.joblib")
    groc_model = joblib.load("./models/Grocery_shopping_model.joblib")
    take_model = joblib.load("./models/Takeaways_dining_model.joblib")
    publ_model = joblib.load("./models/Public_Transportation_model.joblib")

    #models = [accom_model,util_model,groc_model,take_model,publ_model]


    res = {"accom":int(accom_model.predict([[totalMonthlyIncome]])[0]),
            "util":int(util_model.predict([[totalMonthlyIncome]])[0]),
            "groceries":int(groc_model.predict([[totalMonthlyIncome]])[0]),
            "takeaway":int(take_model.predict([[totalMonthlyIncome]])[0]),
            "transport":int(publ_model.predict([[totalMonthlyIncome]])[0]),
            }
    totalSpending=0
    for v in res.values():
        totalSpending+=v
    ratio = totalMonthlyIncome/totalSpending
    newRes = None
    if ratio<1:
        newRes = {key: int(value * ratio) for key, value in res.items()}
    return newRes if newRes else res

