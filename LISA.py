from bs4 import BeautifulSoup
import requests

def getLISA():
    url = 'https://www.savethestudent.org/money/lifetime-isas.html' 
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    ol_elements = soup.find_all('ol', class_='numbers')
    lisa_data = []

    # Loop through each <ol> element and extract data as plain text
    for ol in ol_elements:
        for li in ol.find_all('li'):
            # Extract the name as plain text
            name = li.find('h3').get_text(strip=True) if li.find('h3') else None
            link = li.find('p').find('a').get('href') if li.find('p') and li.find('p').find('a') else None

            minimum_investment = None
            interest_paid = None

            # Look for specific details in <ul> items, and extract text
            if li.find('ul'):
                for detail in li.find('ul').find_all('li'):
                    text = detail.get_text(strip=True)
                    if "Minimum investment" in text:
                        minimum_investment = text.split('–')[-1].strip()
                    elif "Interest paid" in text or "Annual fees" in text:
                        interest_paid = text.split('–')[-1].strip()

            # Append as a list of text items
            if name and link:
                lisa_data.append([name, link, minimum_investment, interest_paid])

    print(lisa_data)
    return lisa_data

getLISA()