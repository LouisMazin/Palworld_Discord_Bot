import requests

url = "http://localhost:8212/v1/api/metrics"

payload={}
headers = {
  'Accept': 'application/json'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)