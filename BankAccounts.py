from bs4 import BeautifulSoup
import requests


def getBank():
    url = 'https://www.savethestudent.org/money/student-banking/student-bank-accounts.html' 

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    soup = BeautifulSoup(response.text, 'html.parser')

    table = soup.find('table', id='BestBroadband')

    if table:

        rows = table.find_all('tr', class_='row-3')  # Find all rows with the class "row-3"
        maxi = 0
        bank = []
        
        for row in rows:
            cols = row.find_all('td')  # Get all data cells in the row
            cols = [col.text.strip() for col in cols]  # Clean the data
            if cols:  # Ensure there's data
                percent = float(cols[3][:-1])
                if percent > maxi:
                    maxi = percent
                    bank = cols
        bank[1] = bank[1][bank[1].find('£'):]
        bank.pop()
        for i in range(0,len(bank)):
            bank[i] = bank[i].replace("*","")

        return bank # [bank account name,overdraft,sign-in bonus,student rating]
    



