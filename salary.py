import pandas as pd
from sklearn.preprocessing import LabelEncoder # type: ignore
from sklearn.ensemble import RandomForestRegressor # type: ignore
from sklearn.model_selection import train_test_split # type: ignore
from sklearn.metrics import mean_squared_error, r2_score # type: ignore

def cleanSalary(salary):
    salary = salary.replace('£', '').replace(',', '').replace("per annum", "").replace("pro-rata","").replace("OTE","").replace("inc benefits","").replace("negotiable","").replace("up to","").replace("‚","").replace("¬","").strip()
    if '-' in salary:
        low, high = map(float, salary.split('-'))
        return (low + high) / 2
    else:
        return float(salary)

#Main function to get salary predictions based on location and degree type
def getSalary(location, degType):
    db = pd.read_csv("reed_uk.csv")
    db['salary_offered'] = db['salary_offered'].apply(cleanSalary)

    #Encode categorical columns
    label_encoders = {}
    for column in ['category', 'city', 'job_title', 'job_type', 'state']:
        le = LabelEncoder()
        db[column] = le.fit_transform(db[column].astype(str))
        label_encoders[column] = le

    features = db[['category', 'city', 'job_title', 'job_type', 'state']]
    target = db['salary_offered']
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

    #Train the model
    model = RandomForestRegressor(random_state=42)
    model.fit(X_train, y_train)

    #Model evaluation
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"Mean Squared Error: {mse}")
    print(f"R^2 Score: {r2}")

    #Determine job categories based on degree type
    if degType == "Law":
        categories = ["law jobs"]
    elif degType == "Humanities":
        categories = ["hr jobs", "retail jobs", "estate agent jobs", "catering jobs"]
    else:
        categories = ["marketing jobs", "factory jobs", "motoring automotive jobs","banking jobs","science jobs"]

    #Transform categories to encoded values and filter relevant jobs
    encoded_categories = label_encoders['category'].transform(categories)
    degreeJobs = db[db['category'].isin(encoded_categories)]

    #Display relevant job details and salary predictions
    for index, row in degreeJobs.iterrows():
        city_name = label_encoders['state'].inverse_transform([int(row['state'])])[0]
        job_title_name = label_encoders['job_title'].inverse_transform([int(row['job_title'])])[0]
        salary_prediction = model.predict([[row['category'], row['city'], row['job_title'], row['job_type'], row['state']]])
        
        # Filter by location if specified
        if location is None or city_name == location:
            print(f"Job Title: {job_title_name}, City: {city_name}, Predicted Salary: £{salary_prediction[0]:,.2f}")



getSalary("London","law")