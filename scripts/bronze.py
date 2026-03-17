import requests
import json
from dotenv import load_dotenv
import os
from datetime import datetime, timezone
from pathlib import Path

load_dotenv() # Load env 
uri = os.getenv('DB_STRING')

def extract_matches(status):
    url = f"https://api.wc2026api.com/matches?status={status}"

    KEY = os.getenv('API_KEY')

    payload = {}
    headers = {
    'Authorization': f"Bearer {KEY}",
    'Authorization': 'Bearer wc2026_3ZeeJjWmcFam5eA6HkUdswBS'
    }


    response = requests.request("GET", url, headers=headers, data=payload)

    data = response.json()


    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")

    # Creare, guardare y referenciare el volumen de datos. Habrá un archivo que contenga la informacion por cada momento que se ejecute
    #path = Path(f"/opt/airflow/data/bronze/match_{timestamp}.json")
    path = Path(__file__).parent.parent / "data" / "bronze" / f"match_{timestamp}.json"

    with open(path,"w") as f:
        json.dump(data,f)
    
    #context["ti"].xcom_push(key="bronze_file",value=str(path))

extract_matches("scheduled")