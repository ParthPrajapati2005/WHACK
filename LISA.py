from bs4 import BeautifulSoup
import requests

def getLISA():

    url = 'https://www.savethestudent.org/money/lifetime-isas.html'  # Replace with the URL of the page you want to scrape

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all <ol> with class 'numbers'
    ol_elements = soup.find_all('ol', class_='numbers')

    # Initialize a 2D array to hold the LISA information
    lisa_data = []


    # Loop through each <ol> element
    ol = ol_elements[0]
    for li in ol.find_all('li'):
        # Extract the name (from <h3>)
        name = li.find('h3')
        link = ""
        minI = ""

        if(li.find('p') != None):
            link = li.find('p').find('a').get('href')
        
        if(li.find('ul') != None):
            temp = li.find('ul').find_all('li')

            minimum_investment = None
            interest_paid = None

            for li in temp:
                if "Minimum investment" in li.get_text():
                    minimum_investment = li.get_text(strip=True).split('–')[-1].strip()
                elif "Interest paid" in li.get_text():
                    interest_paid = li.get_text(strip=True).split('–')[-1].strip()
            
        

        if(name != None and link != ''):
            lisa_data.append([name, link, minimum_investment, interest_paid])
            

    ol = ol_elements[1]
    for li in ol.find_all('li'):
        # Extract the name (from <h3>)
        name = li.find('h3')
        link = ""
        minI = ""

        if(li.find('p') != None):
            link = li.find('p').find('a').get('href')
        
        if(li.find('ul') != None):
            temp = li.find('ul').find_all('li')

            minimum_investment = None
            interest_paid = None

            for li in temp:
                if "Minimum investment" in li.get_text():
                    minimum_investment = li.get_text(strip=True).split('–')[-1].strip()
                elif "Annual fees" in li.get_text():
                    interest_paid = li.get_text(strip=True).split('–')[-1].strip()

        if(name != None and link != ''):
            lisa_data.append([name, link, minimum_investment, interest_paid])
