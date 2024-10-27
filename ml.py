import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
import joblib  #For saving models
import os      #For managing file paths

#Create directory for exported models and plots if not exist
os.makedirs("models", exist_ok=True)
os.makedirs("plots", exist_ok=True)
data = pd.read_csv('UK_Student_Expenses.csv')

#Set up features (X) and targets (y)
X = data[['Monthly_Income']]
y = data[['Student_Accommodation', 'Utilities', 'Grocery_shopping', 'Takeaways/dining', 'Public_Transportation']]
models = {}
predictions = {}

#Loop through each target expense column
for column in y.columns:
    X_train, X_test, y_train, y_test = train_test_split(X, y[column], test_size=0.2, random_state=42)
    
    #Train a Random Forest model for each expense category
    model = LinearRegression()
    model.fit(X_train, y_train)
    models[column] = model
    predictions[column] = model.predict(X)
    
    #Save each model to disk, replacing any slashes in column names
    sanitized_column = column.replace("/", "_")  # Replace special characters
    joblib.dump(model, f"models/{sanitized_column}_model.joblib")
    
    #Calculate performance (mean absolute error)
    mae = mean_absolute_error(y_test, model.predict(X_test))
    print(f"{column} model MAE: {mae:.2f}")

#Define the new income value for prediction
new_income = 1000 

#Convert it into the format expected by the model
new_income_df = pd.DataFrame([[new_income]], columns=['Monthly_Income'])

#Predict each expense category based on the new income value
suggestions = {}
for column, model in models.items():
    suggested_value = model.predict(new_income_df)[0]
    suggestions[column] = round(suggested_value, 2)

print("\nSuggested spending values based on monthly income:")
print(suggestions)

#Plot Income vs each Expense Category
fig, axes = plt.subplots(nrows=3, ncols=2, figsize=(14, 10))
fig.suptitle("Monthly Income vs Expense Categories Linear Regression", fontsize=16)

#Flatten axes for easy indexing
axes = axes.flatten()

#Generate scatter plots with predicted regression lines for each expense category
for i, column in enumerate(y.columns):
    #Plot actual data points
    axes[i].scatter(X, y[column], color='blue', alpha=0.5, label="Actual")
    
    #Plot the predictions from the Random Forest model
    axes[i].scatter(X, predictions[column], color='red', alpha=0.5, label="Predicted")
    
    #Set labels and title
    axes[i].set_xlabel("Monthly Income")
    axes[i].set_ylabel(column)
    axes[i].set_title(f"Income vs {column}")
    axes[i].legend()

    #Save each subplot as an individual image, sanitizing the column name for file compatibility
    fig_path = f"plots/{sanitized_column}_plot.png"
    plt.savefig(fig_path)

#Hide any unused subplots
for j in range(len(y.columns), len(axes)):
    fig.delaxes(axes[j])

plt.tight_layout(rect=[0, 0.03, 1, 0.95])  #Adjust layout to fit titles

#Save the complete figure with all subplots
plt.savefig("plots/Income_vs_Expense_Categories.png")
plt.show()
